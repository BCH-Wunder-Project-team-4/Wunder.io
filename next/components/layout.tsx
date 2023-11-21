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
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>

        </main>
        <Toaster />
        <Footer />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}
