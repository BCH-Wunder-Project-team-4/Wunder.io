import { FooterLinks } from "./footerLinks";
import Link from "next/link";
import type { Menu } from "@/lib/zod/menu";
import { NewsletterForm } from "./newsletterForm";
import { SocialShare } from "@/components/footer/social-share";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface FooterProps {
  menu: Menu;
}



export function Footer({ menu }: FooterProps) {

  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <footer className="border-t border-finnishwinter">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:justify-between border-b-finnishwinter border-b-2 py-8">
        <NewsletterForm />
        <FooterLinks />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center py-5 sm:flex-row sm:justify-between">
          <p className="relative w-fit [font-family:'Overpass-Regular',Helvetica] font-normal text-[#040505cc] text-[14px] tracking-[0] leading-[normal]">
            © 2023 Wunder. All Rights Reserved.
          </p>
          <SocialShare />
        </div>
      </div>
    </footer >
  );
}

