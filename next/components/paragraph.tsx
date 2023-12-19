import dynamic from "next/dynamic";

import { ParagraphFileAttachments } from "@/components/paragraph--file-attachments";
import { FullWidthParagraph } from "@/components/paragraph--full-width-paragraph";
import { ParagraphHero } from "@/components/paragraph--hero";
import { ParagraphImage } from "@/components/paragraph--image";
import { ParagraphLinks } from "@/components/paragraph--links";
import { ParagraphListingArticles } from "@/components/paragraph--listing-articles";
import { ParagraphListingExpertTalks } from "@/components/paragraph--listing-expertTalks";
import { ParagraphText } from "@/components/paragraph--text";
import { Paragraph } from "@/lib/zod/paragraph";
import { ParagraphAnchor } from "./paragraph--anchor";
import { ParagraphArticleBodyText } from "./paragraph--article-body-text";
import { ParagraphBanner } from "./paragraph--banner";
import { ParagraphListingEvents } from "./paragraph--listing-events";
import { ParagraphLogoWall } from "./paragraph--logo-wall";
import { ParagraphScrollingNumbers } from "./paragraph--scrolling-numbers";
import { ParagraphSectionbg } from "./paragraph--sectionbg";
import { ParagraphServices } from "./paragraph--services";
import { ParagraphSimpleQuote } from "./paragraph--simple-quote";
import { ParagraphSubheading } from "./paragraph--subheading";
import { ParagraphTrilogySnapshot } from "./paragraph--trilogy_snapshot";
import { ParagraphWunderpedia } from "./paragraph--wunderpedia";
import { ParagraphWunderStory } from "./paragraph--wunderStory";
import { ParagraphFrame } from "./paragraph--frame";
import { ParagraphContactDetails } from "./paragraph--contact-details";
import { ParagraphTextAndImage } from "./paragraph--text-and-image";

// Use dynamic imports to defer loading a component until after initial page load: https://nextjs.org/docs/advanced-features/dynamic-import
const ParagraphVideo = dynamic(() =>
  import("./paragraph--video").then((mod) => mod.ParagraphVideo),
);

const ParagraphAccordion = dynamic(() =>
  import("./paragraph--accordion").then((mod) => mod.ParagraphAccordion),
);

export function Paragraph({ paragraph }: { paragraph: Paragraph }) {
  if (!paragraph) {
    return null;
  }

  switch (paragraph.type) {
    case "paragraph--formatted_text": {
      return <ParagraphText paragraph={paragraph} />;
    }
    case "paragraph--links": {
      return <ParagraphLinks paragraph={paragraph} />;
    }
    case "paragraph--image": {
      return <ParagraphImage paragraph={paragraph} />;
    }
    case "paragraph--video": {
      return <ParagraphVideo paragraph={paragraph} />;
    }
    case "paragraph--accordion": {
      return <ParagraphAccordion paragraph={paragraph} />;
    }
    case "paragraph--hero": {
      return <ParagraphHero paragraph={paragraph} />;
    }
    case "paragraph--listing_articles": {
      return <ParagraphListingArticles paragraph={paragraph} />;
    }
    case "paragraph--listing_experts_talks": {
      return <ParagraphListingExpertTalks paragraph={paragraph} />;
    }
    case "paragraph--listing_events": {
      return <ParagraphListingEvents paragraph={paragraph} />;
    }
    case "paragraph--file_attachments": {
      return <ParagraphFileAttachments paragraph={paragraph} />;
    }
    case "paragraph--banner": {
      return <ParagraphBanner paragraph={paragraph} />;
    }
    case "paragraph--scrolling_numbers": {
      return <ParagraphScrollingNumbers paragraph={paragraph} />;
    }
    case "paragraph--full_width_paragraph": {
      return <FullWidthParagraph paragraph={paragraph} />;
    }
    case "paragraph--wunderpedia": {
      return <ParagraphWunderpedia paragraph={paragraph} />;
    }
    case "paragraph--simple_quote": {
      return <ParagraphSimpleQuote paragraph={paragraph} />;
    }
    case "paragraph--services": {
      return <ParagraphServices paragraph={paragraph} />;
    }
    case "paragraph--subheading": {
      return <ParagraphSubheading paragraph={paragraph} />;
    }
    case "paragraph--sectionbg": {
      return <ParagraphSectionbg paragraph={paragraph} />;
    }
    case "paragraph--logo_wall": {
      return <ParagraphLogoWall paragraph={paragraph} />;
    }
    case "paragraph--wunder_story": {
      return <ParagraphWunderStory paragraph={paragraph} />;
    }
    case "paragraph--trilogy_snapshot": {
      return <ParagraphTrilogySnapshot paragraph={paragraph} />;
    }
    case "paragraph--anchor": {
      return <ParagraphAnchor paragraph={paragraph} />;
    }
    case "paragraph--frame": {
      return <ParagraphFrame paragraph={paragraph} />;
    }
    case "paragraph--article_body_text": {
      return <ParagraphArticleBodyText paragraph={paragraph} />;
    }
    case "paragraph--contact_details": {
      return <ParagraphContactDetails paragraph={paragraph} />;
    }
    case "paragraph--text_and_image": {
      return <ParagraphTextAndImage paragraph={paragraph} />;
    }
    default:
      return null;
  }
}
