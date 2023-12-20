import "@/styles/globals.css";
import "aos/dist/aos.css";

import {
  LanguageLinks,
  LanguageLinksProvider,
} from "@/lib/contexts/language-links-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { inter, overpass } from "@/styles/fonts";

import AOS from "aos";
import { AppProps } from "next/app";
import { CommonPageProps } from "@/lib/get-common-page-props";
import { Layout } from "@/components/layout";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

interface PageProps extends CommonPageProps {
  languageLinks?: LanguageLinks;
  session?: Session;
}

function App({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const { menus, languageLinks, session, ...restPageProps } = pageProps;

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);



  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Fonts>
            <LanguageLinksProvider languageLinks={languageLinks}>
              <Layout menus={menus}>
                <Component {...restPageProps} />
              </Layout>
            </LanguageLinksProvider>
          </Fonts>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${overpass.variable} font-overpass antialiased`}
    >
      {children}
    </div>
  );
}

export default appWithTranslation(App);
