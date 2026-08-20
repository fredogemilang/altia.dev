import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  Globe,
  Smartphone,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";

interface ServicesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Services");
  const tHero = await getTranslations("Hero");

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO HEADER                                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-8 bg-noise border-b border-warm-border/60">
        <Container size="large">
          <div className="max-w-3xl">
            <Badge variant="vermilion" size="md" className="mb-4 uppercase tracking-widest text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-vermilion" />
              <span>{t("tag")}</span>
            </Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-charcoal leading-[1.12] mb-6">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl text-charcoal-muted leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. THREE CORE SERVICES DEEP DIVE                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-20 sm:gap-28">
        {/* Service 01: Web Development */}
        <div id="web" className="scroll-mt-32">
          <Container size="large">
            <ScrollReveal variant="fade-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-cream/40 rounded-4xl p-8 sm:p-12 lg:p-16 border border-warm-border">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                      <Globe className="w-6 h-6" />
                    </div>
                    <span className="font-display font-black text-3xl text-vermilion">
                      {t("items.web.number")}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
                    {t("items.web.title")}
                  </h2>

                  <p className="text-base sm:text-lg text-charcoal font-medium">
                    {t("items.web.tagline")}
                  </p>

                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                    {t("items.web.description")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Corporate WordPress & Headless CMS (Custom Themes)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Enterprise PHP (Laravel 11 & Symfony)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>High-Throughput Go & Node.js Microservices</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Next.js, Astro & React Web Flagships</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Distributed PostgreSQL, MySQL, Redis & Docker</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>100/100 Core Web Vitals & Edge Caching</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-display font-bold uppercase text-charcoal-muted mr-2">
                      Stack:
                    </span>
                    {["WordPress", "PHP (Laravel 11)", "Go", "Next.js 14", "Symfony", "TypeScript", "PostgreSQL", "MySQL", "Docker"].map(
                      (tech) => (
                        <Badge key={tech} variant="cream" size="sm">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <div className="pt-4">
                    <Button href="/contact" variant="primary" size="md">
                      <span>Inquire Web Architecture</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-charcoal text-ivory rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-warm-lg">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-500/40">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-vermilion" />
                        <div className="w-3 h-3 rounded-full bg-terracotta" />
                        <div className="w-3 h-3 rounded-full bg-warm-border/40" />
                      </div>
                      <span className="text-[10px] text-ivory/50">polyglot-cluster.config.ts</span>
                    </div>
                    <pre className="text-ivory/80 overflow-x-auto leading-relaxed">
                      <code>{`export const enterpriseCluster = {
  apiGateways: "Go (Fiber) + Rust (Actix/Axum)",
  frontendLayer: "Next.js 14 + Astro (Edge SSR)",
  enterpriseCore: "Laravel 11 + Filament (PHP 8.3)",
  wasmCompute: "Rust WebAssembly in-browser",
  storageLayer: {
    primary: "PostgreSQL / MySQL with Sharding",
    cache: "Redis Cluster (< 2ms response)",
    olap: "ClickHouse Real-Time Analytics"
  },
  devops: "Docker + Kubernetes + CI/CD"
};`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </div>

        {/* Service 02: Mobile & Desktop Apps */}
        <div id="app" className="scroll-mt-32">
          <Container size="large">
            <ScrollReveal variant="fade-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-cream/40 rounded-4xl p-8 sm:p-12 lg:p-16 border border-warm-border">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <span className="font-display font-black text-3xl text-vermilion">
                      {t("items.app.number")}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
                    {t("items.app.title")}
                  </h2>

                  <p className="text-base sm:text-lg text-charcoal font-medium">
                    {t("items.app.tagline")}
                  </p>

                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                    {t("items.app.description")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Cross-Platform Flutter & React Native</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Native macOS / Windows Utilities</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Offline-First SQLite & Sync Engines</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Apple HealthKit & Sensor Interop</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-display font-bold uppercase text-charcoal-muted mr-2">
                      Stack:
                    </span>
                    {["Flutter", "Dart", "React Native", "Rust FFI", "Electron", "SQLite"].map(
                      (tech) => (
                        <Badge key={tech} variant="cream" size="sm">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <div className="pt-4">
                    <Button href="/contact" variant="primary" size="md">
                      <span>Inquire App Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-charcoal text-ivory rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-warm-lg">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-500/40">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-vermilion" />
                        <div className="w-3 h-3 rounded-full bg-terracotta" />
                        <div className="w-3 h-3 rounded-full bg-warm-border/40" />
                      </div>
                      <span className="text-[10px] text-ivory/50">app-runtime.dart</span>
                    </div>
                    <pre className="text-ivory/80 overflow-x-auto leading-relaxed">
                      <code>{`class AltiaAppEngine {
  final MultiPlatformRuntime platform;
  final LocalStorageCache cache;

  Future<void> initialize() async {
    await cache.syncOfflineDatabase();
    platform.enableNative60fpsIsolates();
    print("Multi-platform ready on iOS & macOS");
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </div>

        {/* Service 03: AI Automation */}
        <div id="ai" className="scroll-mt-32">
          <Container size="large">
            <ScrollReveal variant="fade-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-cream/40 rounded-4xl p-8 sm:p-12 lg:p-16 border border-warm-border">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-vermilion text-ivory flex items-center justify-center font-display font-bold">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="font-display font-black text-3xl text-vermilion">
                      {t("items.ai.number")}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
                    {t("items.ai.title")}
                  </h2>

                  <p className="text-base sm:text-lg text-charcoal font-medium">
                    {t("items.ai.tagline")}
                  </p>

                  <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
                    {t("items.ai.description")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Multi-Agent Autonomous Systems</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Enterprise RAG & Hybrid Dense/Sparse Search</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Automated Document & PDF Synthesizers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                      <span>Hallucination Guardrails & Tool Calling</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-display font-bold uppercase text-charcoal-muted mr-2">
                      Stack:
                    </span>
                    {["Python", "LangChain", "FastAPI", "Qdrant", "GPT-4o", "Claude 3.5"].map(
                      (tech) => (
                        <Badge key={tech} variant="cream" size="sm">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>

                  <div className="pt-4">
                    <Button href="/contact" variant="primary" size="md">
                      <span>Inquire AI Automation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-charcoal text-ivory rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-warm-lg">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-charcoal-500/40">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-vermilion" />
                        <div className="w-3 h-3 rounded-full bg-terracotta" />
                        <div className="w-3 h-3 rounded-full bg-warm-border/40" />
                      </div>
                      <span className="text-[10px] text-ivory/50">agent-graph.py</span>
                    </div>
                    <pre className="text-ivory/80 overflow-x-auto leading-relaxed">
                      <code>{`from langgraph.graph import StateGraph

workflow = StateGraph(AgentState)
workflow.add_node("router", query_classifier)
workflow.add_node("retriever", hybrid_rag_search)
workflow.add_node("auditor", hallucination_guard)
workflow.add_edge("retriever", "auditor")

app = workflow.compile()
print("AI Agent Graph online with 99.4% precision")`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. AGILE METHODOLOGY & PROCESS                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-charcoal text-ivory">
        <Container size="large">
          <SectionHeading
            tag={t("process.tag")}
            title={t("process.title")}
            dark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal variant="fade-up" delay={0.1}>
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <span className="font-display font-black text-4xl text-vermilion">
                  01
                </span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  {t("process.steps.0.title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("process.steps.0.desc")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.25}>
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <span className="font-display font-black text-4xl text-vermilion">
                  02
                </span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  {t("process.steps.1.title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("process.steps.1.desc")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4}>
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <span className="font-display font-black text-4xl text-vermilion">
                  03
                </span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  {t("process.steps.2.title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("process.steps.2.desc")}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.55}>
              <div className="flex flex-col gap-4 p-6 rounded-3xl bg-charcoal-800 border border-charcoal-500/30 h-full">
                <span className="font-display font-black text-4xl text-vermilion">
                  04
                </span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  {t("process.steps.3.title")}
                </h3>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  {t("process.steps.3.desc")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
