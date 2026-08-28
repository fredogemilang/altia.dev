/**
 * generate-responsive-images.mjs
 *
 * Generates responsive WebP variants ALONGSIDE originals (does NOT overwrite originals):
 *   - Portfolio images: generates 1-sm.webp (640w) and 1-md.webp (960w) next to 1.webp
 *   - Logos: generates altia-dev-logo-sm.webp (420w) next to altia-dev-logo.webp
 *
 * Originals are kept as-is and used as fallback src.
 * Run: node scripts/generate-responsive-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, writeFile } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const PORTFOLIO_DIR = join(PUBLIC_DIR, 'uploads', 'portfolio');
const UPLOADS_DIR = join(PUBLIC_DIR, 'uploads');

// Quality settings — high quality WebP
const QUALITY = 85;

// ─── Portfolio Image Config ─────────────────────────────────────────────────
// Portfolio cards render max ~620px on desktop, ~100vw on mobile
// We generate 2 smaller sizes alongside the original:
//   -sm : 640w  → mobile (<768px), ~100vw
//   -md : 960w  → tablet / small desktop (50vw)
// The original stays as the largest fallback.
const PORTFOLIO_VARIANTS = [
  { suffix: '-sm', width: 640 },
  { suffix: '-md', width: 960 },
];

// ─── Logo Config ─────────────────────────────────────────────────────────────
// Logo displays max ~210px. 2× retina = 420px.
// Generate -sm (420w) alongside original.
const LOGO_VARIANTS = [
  { suffix: '-sm', width: 420 },
];

const LOGO_FILES = [
  join(UPLOADS_DIR, 'altia-dev-logo.webp'),
  join(UPLOADS_DIR, 'altia-dev-logo-white.webp'),
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getFileSizeKB(filePath) {
  try {
    const s = await stat(filePath);
    return (s.size / 1024).toFixed(1);
  } catch {
    return '?';
  }
}

/**
 * Resize inputPath to width and save to a NEW outputPath.
 * We write to a buffer first (avoids any file-locking issues on Windows).
 */
async function resizeImage(inputPath, outputPath, width, label) {
  const originalKB = await getFileSizeKB(inputPath);

  // Process via buffer to avoid Windows file lock issues entirely
  const buffer = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  await writeFile(outputPath, buffer);

  const newKB = await getFileSizeKB(outputPath);
  console.log(`  ✓ [${label}] → ${outputPath.split('\\').pop()} — ${newKB}KB  (original: ${originalKB}KB)`);
}

/**
 * Only return "original" portfolio images: files matching /^\d+\.webp$/ (e.g. 1.webp, 2.webp)
 * This excludes already-generated variants like 1-sm.webp, 1-md.webp
 */
async function getAllPortfolioImages() {
  const projects = await readdir(PORTFOLIO_DIR);
  const images = [];
  for (const project of projects) {
    const projectDir = join(PORTFOLIO_DIR, project);
    const s = await stat(projectDir);
    if (!s.isDirectory()) continue;
    const files = await readdir(projectDir);
    for (const file of files) {
      // Only original images: 1.webp, 2.webp, 3.webp (no suffix variants)
      if (!file.match(/^\d+\.(webp|jpg|jpeg|png)$/i)) continue;
      images.push({ project, file, path: join(projectDir, file) });
    }
  }
  return images;
}

function buildOutputPath(inputPath, suffix) {
  const dir = dirname(inputPath);
  const ext = extname(inputPath);
  const base = basename(inputPath, ext);
  return join(dir, `${base}${suffix}${ext}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🖼️  ALTIA DEV — Responsive Image Generator\n');
  console.log('  Strategy: Generate -sm / -md variants alongside originals (originals unchanged)\n');

  // ── Portfolio Images ──────────────────────────────────────────────────────
  console.log('📁 Processing portfolio images...\n');
  const portfolioImages = await getAllPortfolioImages();
  let portfolioCount = 0;

  for (const { project, file, path: inputPath } of portfolioImages) {
    console.log(`  [${project}/${file}]`);
    for (const { suffix, width } of PORTFOLIO_VARIANTS) {
      const outputPath = buildOutputPath(inputPath, suffix);
      const label = suffix.replace('-', '');
      await resizeImage(inputPath, outputPath, width, label);
      portfolioCount++;
    }
    console.log('');
  }

  // ── Logo Images ───────────────────────────────────────────────────────────
  console.log('🔵 Processing logo images...\n');
  for (const logoPath of LOGO_FILES) {
    const fileName = basename(logoPath);
    console.log(`  [${fileName}]`);
    for (const { suffix, width } of LOGO_VARIANTS) {
      const outputPath = buildOutputPath(logoPath, suffix);
      const label = suffix.replace('-', '');
      await resizeImage(logoPath, outputPath, width, label);
    }
    console.log('');
  }

  console.log(`✅ Done! Generated ${portfolioCount} portfolio variants for ${portfolioImages.length} images + ${LOGO_FILES.length * LOGO_VARIANTS.length} logo variants.\n`);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
