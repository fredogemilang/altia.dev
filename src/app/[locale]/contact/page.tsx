import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Sparkles,
  Mail,
  MapPin,
  Clock,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <div className="flex flex-col gap-16 pb-24">
      {/* 1. Header */}
      <section className="pt-12 pb-8 bg-noise border-b border-warm-border/60">
        <Container size="large">
          <div className="max-w-3xl">
            <Badge
              variant="vermilion"
              size="md"
              className="mb-4 uppercase tracking-widest text-[11px] font-bold"
            >
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

      {/* 2. Contact Form & Info Grid */}
      <section>
        <Container size="large">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm locale={locale} />
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Studio Info Card */}
              <div className="bg-cream/50 rounded-3xl p-8 border border-warm-border flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-vermilion/10 text-vermilion flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                      {t("info.emailTitle")}
                    </span>
                    <a
                      href={`mailto:${t("info.email")}`}
                      className="font-display font-bold text-base text-charcoal hover:text-vermilion transition-colors"
                    >
                      {t("info.email")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-vermilion/10 text-vermilion flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                      {t("info.officeTitle")}
                    </span>
                    <span className="font-display font-bold text-base text-charcoal">
                      {t("info.office")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-vermilion/10 text-vermilion flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-display font-bold tracking-wider text-charcoal-muted block mb-1">
                      {t("info.hoursTitle")}
                    </span>
                    <span className="font-display font-bold text-base text-charcoal">
                      {t("info.hours")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality Guarantee Card */}
              <div className="bg-charcoal text-ivory rounded-3xl p-8 flex flex-col gap-4 shadow-warm">
                <span className="text-vermilion font-display font-bold text-xs uppercase tracking-widest">
                  Our Commitment
                </span>
                <h3 className="font-display text-xl font-bold text-ivory">
                  What happens next?
                </h3>
                <ul className="space-y-2.5 text-xs text-ivory/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                    <span>Architectural review within 24 hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                    <span>NDA protection for all submitted materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-vermilion flex-shrink-0" />
                    <span>30-minute scoping call with lead architects</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
