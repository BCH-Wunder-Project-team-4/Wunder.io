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
        <main className="grow bg-mischka" id="main-content">
          <div className="mx-auto max-w-6xl px-6 py-8">
          <Breadcrumb
          homeElement={'Home'}
          separator={<span>
            <Chevron className="inline-block w-6 h-6" />
              </span>}
          activeClasses='text-primary-600'
          containerClasses='flex py-5' 
          listClasses='hover:underline mx-2 font-bold'
          capitalizeLinks
        />
        {children}
          </div>

        </main>
        <Toaster />
        <Footer />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}
