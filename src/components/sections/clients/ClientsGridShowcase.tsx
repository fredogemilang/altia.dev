"use client";

import React from "react";
import { CLIENT_COMPANIES } from "@/data/clients";
import { type Locale, getLocalizedPath } from "@/i18n/utils";
import { cn } from "@/lib/utils";

interface ClientsGridShowcaseProps {
  locale?: Locale;
}

export function ClientsGridShowcase({ locale = "en" }: ClientsGridShowcaseProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Divider-Only Grid (No outer frame borders) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {CLIENT_COMPANIES.map((client) => {
          const targetUrl = getLocalizedPath(
            `/portfolio?tag=${encodeURIComponent(client.tag)}`,
            locale
          );

          return (
            <a
              key={client.id}
              href={targetUrl}
              data-cursor
              data-cursor-text="PORTFOLIO"
              className={cn(
                "group relative flex flex-col items-center justify-center p-7 sm:p-10 text-center",
                "bg-transparent transition-[background-color,transform,box-shadow,border-radius] duration-300 ease-emil-out",
                // Hover effect: zoom into pure white with elevated shadow and rounded corners
                "hover:bg-white hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(47,42,38,0.12)] hover:rounded-2xl hover:z-20",
                // Column Dividers (Horizontal Borders)
                "border-r border-warm-border/70",
                "[&:nth-child(2n)]:border-r-0",
                "sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0",
                "lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(4n)]:border-r-0",
                // Row Dividers (Vertical Borders)
                "border-b border-warm-border/70",
                "[&:nth-child(n+7)]:border-b-0",
                "sm:[&:nth-child(n+7)]:border-b-0",
                "lg:[&:nth-child(n+5)]:border-b-0"
              )}
            >
              {/* Client Logo with optical centering */}
              <div className="w-full h-14 sm:h-16 flex items-center justify-center max-w-[150px] mx-auto transition-transform duration-300 ease-emil-out group-hover:scale-105">
                <img
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={60}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                />
              </div>

              {/* Company Name */}
              <h3 className="font-display font-bold text-sm sm:text-base text-charcoal group-hover:text-vermilion transition-colors duration-200 mt-4 leading-tight">
                {client.name}
              </h3>

              {/* City, Country */}
              <p className="text-xs text-charcoal-muted mt-1 font-body">
                {client.city}, {client.country[locale]}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
