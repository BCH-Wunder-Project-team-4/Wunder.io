import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/components/preview-banner";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Menu } from "@/lib/zod/menu";
import React from "react";
import { SkipToContentLink } from "@/ui/skip-to-content-link";
import { Toaster } from "@/ui/toaster";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Breadcrumb from "./breadcrumb";
import Chevron from "@/styles/icons/chevron-right.svg";
import CookieConsent from "./cookie-bar";

export interface LayoutProps {
  menus: {
    main: Menu;
    footer: Menu;
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  const isPreviewVisible = useIsPreviewBannerVisible();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen flex-col",
          isPreviewVisible && "mt-10",
        )}
      >
        <SkipToContentLink href="#main-content">
          {t("skip-to-main-content")}
        </SkipToContentLink>
        <Header menu={menus.main} />
        <main className="grow" id="main-content">
          <div className="mx-auto max-w-6xl px-6 py-8">
          <Breadcrumb
          homeElement={'Home'}
          separator={<span>
            <Chevron className="w-6 h-6" />
              </span>}
          activeClasses='text-primary-600 dark:text-primary-200'
          containerClasses='flex pb-4' 
          listClasses='hover:underline mx-2'
          capitalizeLinks
        />
        {children}
          </div>

        </main>
        <Toaster />
        <Footer />
        <CookieConsent />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}