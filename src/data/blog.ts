import { ARTICLE_002_EN, ARTICLE_002_ID } from './blog-article-002';
import { ARTICLE_003_EN, ARTICLE_003_ID } from './blog-article-003';

export type Pillar =
  | 'engineering'
  | 'ai-engineering'
  | 'creative-development'
  | 'infrastructure'
  | 'digital-products';

export const PILLAR_LABELS: Record<Pillar, { en: string; id: string }> = {
  'engineering': { en: 'Engineering', id: 'Engineering' },
  'ai-engineering': { en: 'AI Engineering', id: 'AI Engineering' },
  'creative-development': { en: 'Creative Development', id: 'Creative Development' },
  'infrastructure': { en: 'Infrastructure', id: 'Infrastructure' },
  'digital-products': { en: 'Digital Products', id: 'Produk Digital' },
};

export interface BlogPost {
  slug: string;
  title: {
    en: string;
    id: string;
  };
  excerpt: {
    en: string;
    id: string;
  };
  content: {
    en: string;
    id: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;

  // Editorial metadata (aligned with docs/blog content strategy)
  pillar?: Pillar;
  cluster?: string;
  articleType?: string;
  searchIntent?: string;
  tags?: string[];
  relatedSlugs?: string[];
  relatedProject?: string;
  primaryCta?: string;
}


export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-turn-complex-pdfs-into-structured-knowledge",
    category: "AI",
    pillar: "ai-engineering",
    cluster: "AI-Assisted Document Processing",
    articleType: "Deep Dive",
    searchIntent: "Problem Solving",
    tags: ["ai", "document-processing", "knowledge-management", "pdf", "human-in-the-loop"],
    relatedSlugs: ["meilisearch-vs-vector-search", "rag-vs-search-business-knowledge-system"],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV approaches AI-powered knowledge systems.",
    publishedAt: "2026-08-11",
    readTime: "12",
    title: {
      en: "How to Turn Complex PDFs into Structured Knowledge",
      id: "Cara Mengubah PDF Kompleks Menjadi Pengetahuan Terstruktur",
    },
    excerpt: {
      en: "Learn how AI-assisted document processing can turn complex PDFs into structured, searchable business knowledge with human review and workflow controls.",
      id: "Pelajari bagaimana pemrosesan dokumen berbasis AI dapat mengubah PDF kompleks menjadi pengetahuan bisnis terstruktur dan dapat dicari, dengan review manusia dan kontrol alur kerja.",
    },
    content: {
      en: `
# How to Turn Complex PDFs into Structured Knowledge

Businesses accumulate knowledge in documents long before they build systems around it.

Policies, manuals, procedures, reports, training materials, product documents, operational guides, and internal references often arrive as PDFs. The information is there, but it is not necessarily easy to search, organize, update, or reuse.

That creates a common problem:

> **The business has the knowledge, but the knowledge is trapped inside documents.**

A simple PDF text extractor can recover words from those files. But that is only the beginning.

To make documents genuinely useful inside a knowledge system, the system needs to understand more than text. It needs to identify structure, turn that structure into meaningful content, classify it, and provide a workflow for people to review what the system produced.

This is where AI-assisted document processing becomes interesting.

## Why PDFs Are Harder Than They Look

A PDF may look like a simple document to a human reader.

For software, it can be considerably more complicated.

A document can contain:

- headings
- paragraphs
- tables
- lists
- page breaks
- repeated headers and footers
- sections
- captions
- references
- different document hierarchies

Even when text can be extracted successfully, the resulting text may not preserve the meaning of the original structure.

For example, a system might extract:

\`\`\`text
Customer Eligibility

The following customers are eligible...

1. Existing customers
2. New customers
3. Corporate customers

Required Documents

...
\`\`\`

But a knowledge system does not necessarily want one large block of text.

It may need something closer to:

\`\`\`text
Title:
Customer Eligibility

Category:
Customer Policy

Content:
...

Related Topic:
Required Documents
\`\`\`

The difference is important.

The first output is extracted text.

The second is structured knowledge.

## Text Extraction Is Only the First Step

One of the easiest mistakes is to treat PDF processing as a text extraction problem.

A simplified pipeline might look like:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Text Extraction]
    B --> C[Database]
\`\`\`

That can work for some use cases.

But if the objective is to build a useful knowledge system, the pipeline often needs another layer:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Document Understanding]
    B --> C[Structure Recognition]
    C --> D[Content Generation]
    D --> E[Classification]
    E --> F[Human Review]
    F --> G[Structured Knowledge]
    G --> H[Search]
\`\`\`

The important shift is from:

> "Can we extract the text?"

to:

> "Can we understand enough of the document to turn it into something useful?"

## What "Structured Knowledge" Actually Means

Structured knowledge does not necessarily mean putting every sentence into a rigid database schema.

It means giving information enough structure that the rest of the system can work with it.

For example, a knowledge item may have:

- Title
- Category
- Content
- Source Document
- Related Project
- Metadata
- Publication Status

The exact schema depends on the business.

The important part is that the system creates a consistent unit of knowledge.

This makes downstream workflows easier:

\`\`\`mermaid
flowchart TD
    A[Document] --> B[Knowledge Items]
    B --> C[Search]
    C --> D[Review]
    D --> E[Publication]
    E --> F[User Access]
\`\`\`

Instead of treating a PDF as a single opaque object, the system can treat its useful information as a collection of searchable knowledge items.

## A Practical PDF-to-Knowledge Pipeline

A useful starting architecture is a four-stage workflow:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B["1. Read"]
    B --> C["2. Understand Structure"]
    C --> D["3. Generate Structured Content"]
    D --> E["4. Human Review"]
    E --> F[Published Knowledge]
\`\`\`

Each stage has a different responsibility.

### 1. Read the Document

The first step is to make the document accessible to the processing system.

The system needs to ingest the PDF and extract the information required for further processing.

At this stage, the goal is not to produce the final knowledge item.

It is simply:

> **Get the document into a form the processing pipeline can understand.**

This distinction helps keep the architecture modular.

### 2. Understand Its Structure

Once the document is readable, the next problem is understanding its organization.

The system needs to determine things such as:

- where sections begin and end
- which text is a heading
- which content belongs to a section
- which information should become a category
- which parts belong together

This is where AI-assisted processing can add significant value.

Instead of relying entirely on fixed rules, an AI model can help interpret the semantic structure of the document.

The objective is not simply to extract everything, but to understand what the extracted information represents.

### 3. Generate Structured Content

After the document structure has been interpreted, the system can generate the fields needed by the knowledge platform.

The AI may be responsible for proposing:

- a useful title
- an appropriate category
- structured content
- normalized formatting

The important word here is **proposing**.

The AI output should not automatically become the final published knowledge.

### 4. Review Before Publishing

This is one of the most important parts of the workflow.

The generated content should pass through an administrative review step.

\`\`\`mermaid
flowchart TD
    A[AI Processing] --> B[Draft Knowledge]
    B --> C[Admin Review]
    C --> D{Decision}
    D -->|Approve| E[Publish]
    D -->|Edit| F[Revise]
    D -->|Reject| G[Discard]
    F --> C
\`\`\`

This creates a human-in-the-loop system.

The goal is not to make AI slower.

The goal is to give automation a controlled boundary.

For business knowledge, an incorrect generated article can be worse than an unprocessed document because users may trust information that appears to have already been structured and approved.

Human review provides a final quality gate.

## Where AI Helps

AI is particularly useful when the transformation requires interpretation rather than simple extraction.

For example, the system can help determine what a section is about, what category it belongs to, and what information should become the knowledge content.

This is different from asking an AI model to simply summarize every PDF.

The objective is to produce output that fits the destination knowledge system.

That means the AI should operate within a defined schema and workflow.

## Why Human Review Still Matters

Automation does not remove the need for judgment.

It changes where judgment happens.

A useful model is:

- **Machine:** Process, Interpret, Draft, Classify
- **Human:** Review, Correct, Approve, Publish

This is especially useful when documents contain information that affects business operations.

The human reviewer can identify:

- incorrect interpretation
- missing context
- inappropriate categorization
- misleading titles
- content that should not be published

The system therefore becomes neither fully manual nor blindly automated.

It becomes:

> **AI-assisted knowledge production with human control.**

## Designing the Knowledge Layer

Document processing is only one part of the overall system.

The generated knowledge needs somewhere to live.

For larger systems, access control and project boundaries also become important.

A knowledge system may not contain one universal pool of information. Different projects may have different users, knowledge, permissions, and content contexts.

That means the architecture needs to model those boundaries explicitly.

## Search Is Part of the Problem

Structured knowledge is only useful if people can find it.

This is where document processing connects directly to search.

Better document understanding leads to better structured knowledge, which leads to better searchable content, which leads to better knowledge retrieval.

Search also influences how the content should be structured in the first place.

If the final knowledge items have useful titles, categories, and content boundaries, the search layer has more meaningful information to work with.

This is why document processing and search should not be treated as completely separate problems. They are parts of the same knowledge workflow.

## A Real-World Example

A useful example comes from an enterprise knowledge management system we built for a client environment.

The system was designed as a multi-project knowledge platform. The platform was built from scratch using Laravel, with Meilisearch providing the search layer.

One of the more specialized workflows was AI-assisted document processing.

The intended flow was:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Read]
    B --> C[Understand Structure]
    C --> D["Generate Title / Category / Content"]
    D --> E[Admin Review]
    E --> F[Publish]
\`\`\`

The system also has live integrations with MARS Outbound, QMS, and CRM.

The important lesson from this type of system is that the AI component is not the entire product.

The actual product is the workflow around the AI.

The useful system combines:

- Document processing
- AI-assisted structuring
- Structured data
- Search
- Permissions
- Review
- Business integrations

That combination is what turns an AI capability into a business application.

## Common Mistakes

### 1. Treating Every PDF as Plain Text

Text extraction can lose the relationships between sections and their meaning. If the destination is a knowledge system, structure matters.

### 2. Sending the Entire Document to an AI Model and Publishing the Result

This can produce a readable output, but readability is not the same as reliable business knowledge. The system needs a defined output structure, validation, review, and publishing controls.

### 3. Starting with the AI Model Instead of the Workflow

It is tempting to start with "Which AI model should we use?" A better starting question is: "What should happen to a document from upload to published knowledge?" The model is one component of that workflow.

### 4. Ignoring the Destination Schema

If the knowledge platform expects Title, Category, and Content, the processing pipeline should be designed around those outputs. AI should not generate a generic summary and leave another manual process to transform it later.

### 5. Forgetting Human Review

Automation should reduce repetitive work. It should not automatically remove accountability. For many business workflows, the right architecture is AI â†’ Review â†’ Publish, not AI â†’ Publish.

### 6. Treating Search as an Afterthought

If the final goal is knowledge retrieval, search should influence the information architecture from the beginning. The document pipeline and search layer should be designed together.

## What We Would Recommend

If a business is considering turning a large document collection into a searchable knowledge system, start with the workflow rather than the AI model.

Define:

1. What documents enter the system?
2. What information needs to be extracted?
3. What structure should the knowledge have?
4. Who reviews the generated content?
5. Who can publish it?
6. Who can search it?
7. How are project boundaries enforced?
8. How does the knowledge connect to existing business systems?

Then select the technologies and AI components that support that workflow.

\`\`\`mermaid
flowchart TD
    A[Document Ingestion] --> B[Document Processing]
    B --> C[AI-Assisted Structuring]
    C --> D[Human Review]
    D --> E[Knowledge Repository]
    E --> F[Search]
    F --> G[Business Application]
\`\`\`

The sophistication should come from solving the actual business problem, not from adding technology for its own sake.

## Conclusion

Turning complex PDFs into structured knowledge is not primarily a PDF problem.

It is a **knowledge workflow problem**.

Text extraction gives you the words. AI can help interpret the structure and transform those words into useful content.

But a production knowledge system also needs:

- structured data
- search
- permissions
- review
- publishing controls
- integration with the surrounding business workflow

The most useful architecture is therefore not PDF â†’ AI â†’ Answer.

It is closer to:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Understand]
    B --> C[Structure]
    C --> D[Review]
    D --> E[Publish]
    E --> F[Search]
    F --> G[Use]
\`\`\`

That shiftâ€”from extracting documents to engineering a knowledge workflowâ€”is where AI-assisted document processing becomes genuinely useful.
      `,
      id: `
# Cara Mengubah PDF Kompleks Menjadi Pengetahuan Terstruktur

Bisnis mengumpulkan pengetahuan dalam bentuk dokumen jauh sebelum mereka membangun sistem untuk mengelolanya.

Kebijakan, manual, prosedur, laporan, materi pelatihan, dokumen produk, panduan operasional, dan referensi internal sering kali datang dalam format PDF. Informasinya ada, tetapi belum tentu mudah dicari, diorganisir, diperbarui, atau digunakan kembali.

Ini menciptakan masalah yang umum:

> **Bisnis memiliki pengetahuan, tetapi pengetahuan itu terperangkap di dalam dokumen.**

Ekstraktor teks PDF sederhana dapat mengambil kata-kata dari file tersebut. Tetapi itu baru permulaan.

Untuk membuat dokumen benar-benar berguna di dalam sistem pengetahuan, sistem perlu memahami lebih dari sekadar teks. Sistem perlu mengidentifikasi struktur, mengubah struktur itu menjadi konten yang bermakna, mengklasifikasikannya, dan menyediakan alur kerja bagi orang untuk mereview apa yang dihasilkan sistem.

Di sinilah pemrosesan dokumen berbasis AI menjadi menarik.

## Mengapa PDF Lebih Sulit dari yang Terlihat

Sebuah PDF mungkin terlihat seperti dokumen sederhana bagi pembaca manusia. Bagi perangkat lunak, ini bisa jauh lebih rumit.

Dokumen dapat berisi heading, paragraf, tabel, daftar, page break, header dan footer berulang, seksi, caption, referensi, dan hierarki dokumen yang berbeda.

Bahkan ketika teks berhasil diekstrak, hasilnya mungkin tidak mempertahankan makna dari struktur aslinya.

Perbedaan antara teks yang diekstrak dan pengetahuan terstruktur itu penting.

## Ekstraksi Teks Hanya Langkah Pertama

Salah satu kesalahan yang paling mudah dilakukan adalah memperlakukan pemrosesan PDF sebagai masalah ekstraksi teks saja.

Jika tujuannya adalah membangun sistem pengetahuan yang berguna, pipeline sering membutuhkan lapisan tambahan: Document Understanding â†’ Structure Recognition â†’ Content Generation â†’ Classification â†’ Human Review â†’ Structured Knowledge â†’ Search.

Pergeseran penting adalah dari "Bisakah kita mengekstrak teksnya?" menjadi "Bisakah kita memahami dokumen dengan cukup baik untuk mengubahnya menjadi sesuatu yang berguna?"

## Apa Arti "Pengetahuan Terstruktur"

Pengetahuan terstruktur tidak selalu berarti memasukkan setiap kalimat ke dalam skema database yang kaku. Ini berarti memberikan informasi struktur yang cukup agar sistem lainnya dapat bekerja dengannya.

## Pipeline PDF-ke-Pengetahuan yang Praktis

Arsitektur awal yang berguna adalah alur kerja empat tahap: Baca â†’ Pahami Struktur â†’ Hasilkan Konten Terstruktur â†’ Review Manusia â†’ Pengetahuan Terpublikasi.

### 1. Baca Dokumen

Langkah pertama adalah membuat dokumen dapat diakses oleh sistem pemrosesan.

### 2. Pahami Strukturnya

Setelah dokumen dapat dibaca, masalah berikutnya adalah memahami organisasinya. AI dapat membantu menginterpretasi struktur semantik dokumen.

### 3. Hasilkan Konten Terstruktur

Setelah struktur dokumen diinterpretasi, sistem dapat menghasilkan field yang dibutuhkan oleh platform pengetahuan. AI bertanggung jawab untuk **mengusulkan** â€” bukan langsung mempublikasikan.

### 4. Review Sebelum Publikasi

Konten yang dihasilkan harus melalui langkah review administratif. Ini menciptakan sistem human-in-the-loop.

## Di Mana AI Membantu

AI sangat berguna ketika transformasi membutuhkan interpretasi, bukan sekadar ekstraksi sederhana. Tujuannya adalah menghasilkan output yang sesuai dengan sistem pengetahuan tujuan.

## Mengapa Review Manusia Tetap Penting

Otomatisasi tidak menghilangkan kebutuhan akan penilaian. Ia mengubah di mana penilaian terjadi. Sistemnya menjadi: **produksi pengetahuan berbasis AI dengan kontrol manusia.**

## Contoh Dunia Nyata

Kami membangun sistem manajemen pengetahuan multi-proyek untuk lingkungan klien menggunakan Laravel dengan Meilisearch sebagai lapisan pencarian. Salah satu alur kerja khusus adalah pemrosesan dokumen berbasis AI: PDF â†’ Baca â†’ Pahami Struktur â†’ Generate Title/Category/Content â†’ Admin Review â†’ Publish.

Pelajaran penting: komponen AI bukanlah seluruh produk. Produk sebenarnya adalah alur kerja di sekitar AI.

## Kesalahan Umum

1. Memperlakukan setiap PDF sebagai teks biasa
2. Mengirim seluruh dokumen ke model AI dan langsung mempublikasikan hasilnya
3. Memulai dari model AI, bukan dari alur kerja
4. Mengabaikan skema tujuan
5. Melupakan review manusia
6. Memperlakukan pencarian sebagai hal tambahan

## Apa yang Kami Rekomendasikan

Mulai dari alur kerja, bukan dari model AI. Tentukan apa yang masuk ke sistem, informasi apa yang perlu diekstrak, struktur apa yang harus dimiliki pengetahuan, dan siapa yang mereview konten.

## Kesimpulan

Mengubah PDF kompleks menjadi pengetahuan terstruktur bukanlah masalah PDF. Ini adalah **masalah alur kerja pengetahuan**.

Pergeseran dari mengekstrak dokumen menjadi merekayasa alur kerja pengetahuan â€” itulah di mana pemrosesan dokumen berbasis AI menjadi benar-benar berguna.
      `,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/complex-pdfs-to-knowledge.webp",
  },
  {
    slug: "meilisearch-vs-vector-search",
    category: "AI",
    pillar: "ai-engineering",
    cluster: "Search + AI",
    articleType: "Comparison",
    searchIntent: "Commercial Investigation / Decision",
    tags: ["meilisearch", "vector-search", "hybrid-search", "semantic-search", "knowledge-management", "enterprise-search"],
    relatedSlugs: ["how-to-turn-complex-pdfs-into-structured-knowledge", "rag-vs-search-business-knowledge-system"],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV approaches search and AI engineering.",
    publishedAt: "2026-08-18",
    readTime: "14",
    title: {
      en: "Meilisearch vs Vector Search: Which Should You Use?",
      id: "Meilisearch vs Vector Search: Mana yang Sebaiknya Digunakan?",
    },
    excerpt: {
      en: "Compare keyword, vector, and hybrid search to choose the right retrieval architecture for knowledge systems, AI applications, and enterprise search.",
      id: "Bandingkan keyword, vector, dan hybrid search untuk memilih retrieval architecture yang tepat bagi knowledge system, aplikasi AI, dan enterprise search.",
    },
    content: {
      en: ARTICLE_002_EN,
      id: ARTICLE_002_ID,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/meilisearch-vs-vector-search.webp",
  },
  {
    slug: "rag-vs-search-business-knowledge-system",
    category: "AI",
    pillar: "ai-engineering",
    cluster: "AI Knowledge Systems",
    articleType: "Decision Guide",
    searchIntent: "Commercial Investigation / Problem Solving",
    tags: ["rag", "retrieval-augmented-generation", "search", "knowledge-management", "ai-assistant", "enterprise-search"],
    relatedSlugs: ["meilisearch-vs-vector-search", "how-to-turn-complex-pdfs-into-structured-knowledge"],
    relatedProject: "vads-knowledge-management",
    primaryCta: "Explore how ALTIA DEV builds AI knowledge systems.",
    publishedAt: "2026-08-25",
    readTime: "13",
    title: {
      en: "RAG vs Search: What Should a Business Knowledge System Use?",
      id: "RAG vs Search: Apa yang Sebaiknya Digunakan untuk Business Knowledge System?",
    },
    excerpt: {
      en: "Should your knowledge system use search, RAG, or both? A practical guide to choosing the right architecture based on real product requirements.",
      id: "Haruskah knowledge system menggunakan search, RAG, atau keduanya? Panduan praktis memilih architecture yang tepat berdasarkan kebutuhan produk yang nyata.",
    },
    content: {
      en: ARTICLE_003_EN,
      id: ARTICLE_003_ID,
    },
    author: {
      name: "Alfredo Gemilang",
      role: "Founder & Lead Engineer",
      avatar: "/uploads/team/Alfredo-Gemilang.webp",
    },
    coverImage: "/uploads/blog/rag-vs-search.webp",
  },
];

