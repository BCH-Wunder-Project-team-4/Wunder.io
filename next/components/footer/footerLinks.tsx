import Link from "next/link"
import { useTranslation } from "next-i18next";

interface TableLinks {
  id: number;
  name: string;
  url: string;
}

const companyLinks: TableLinks[] = [
  {
    id: 1,
    name: "Offering",
    url: "/offering",
  },
  {
    id: 2,
    name: "Cases",
    url: "/cases",
  },
  {
    id: 3,
    name: "Careers",
    url: "/careers",
  },
  {
    id: 4,
    name: "About Wunder",
    url: "/about",
  },
  {
    id: 5,
    name: "Contact us",
    url: "/Contact",
  },
];

const resourcesLinks: TableLinks[] = [
  {
    id: 1,
    name: "News & Events",
    url: "/news",
  },
  {
    id: 2,
    name: "Blog",
    url: "/blog",
  },
  {
    id: 3,
    name: "Wunderpedia",
    url: "/wunderpedia",
  },
  {
    id: 4,
    name: "Wunderway",
    url: "/wunderway",
  },
];

const legalLinks: TableLinks[] = [
  {
    id: 1,
    name: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    id: 2,
    name: "Copyright",
    url: "/copyright",
  },
  {
    id: 3,
    name: "Terms of use",
    url: "/terms-of-use",
  },
  {
    id: 4,
    name: "Accessibility",
    url: "/accessibility",
  },
  {
    id: 5,
    name: "Cookie Settings",
    url: "/coockie-settings",
  },
]

export const FooterLinks = () => {

  const { t } = useTranslation()
  return (
    <div className="px-10 relative columns-3 gap-8 min-h-min  ">
      <ul className="min-h-full">
        <h4 className="text-lg font-bold uppercase tracking-wider py-2 ">{t("company")}</h4>
        {companyLinks.map((link) => {
          return (
            <li key={link.id} className="py-1"><Link href={link.url}>{t(`${link.name}`)}</Link></li>
          )
        })}
      </ul>
      <ul className="min-h-full">
        <h4 className="text-lg font-bold uppercase tracking-wider py-2">{t("resources")}</h4>
        {resourcesLinks.map((link) => {
          return (
            <li key={link.id} className="py-1"><Link href={link.url}>{t(`${link.name}`)}</Link></li>
          )
        })}
      </ul >
      <ul className="min-h-full">
        <h4 className="text-lg font-bold uppercase tracking-wider py-2">{t("legal")}</h4>
        {legalLinks.map((link) => {
          return (
            <li key={link.id} className="py-1"><Link href={link.url}>{t(`${link.name}`)}</Link></li>
          )
        })}
      </ul>
    </div>
  )
}