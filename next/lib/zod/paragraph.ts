import { z } from "zod";

export const FormattedTextSchema = z.object({
  type: z.literal("paragraph--formatted_text"),
  id: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_heading: z.string().nullable(),
});

export const ListingArticlesSchema = z.object({
  type: z.literal("paragraph--listing_articles"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_limit: z.number(),
});
export const ListingExpertTalksSchema = z.object({
  type: z.literal("paragraph--listing_experts_talks"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_limit: z.number(),
});
export const ListingEventsSchema = z.object({
  type: z.literal("paragraph--listing_events"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_limit: z.number(),
});

export const ImageShape = z.object({
  type: z.literal("file--file"),
  id: z.string(),
  filename: z.string(),
  uri: z
    .object({
      url: z.string(),
    })
    .nullable(),
  resourceIdObjMeta: z.object({
    alt: z.string().nullable(),
    title: z.string().nullable(),
    width: z.number(),
    height: z.number(),
  }),
});

export const DocumentShape = z.object({
  type: z.literal("file--file"),
  id: z.string(),
  filename: z.string(),
  filemime: z.string(),
  filesize: z.number(),
  uri: z
    .object({
      url: z.string(),
    })
    .nullable(),
});

export const LinkShape = z.object({
  title: z.string(),
  full_url: z.string(),
});

export const ScrollingNumberShape = z.object({
  type: z.literal("paragraph--scrolling_numbers_item"),
  field_number: z.number(),
  field_number_suffix: z.string().nullable().optional(),
  field_description: z.string(),
});

export const EmployeeContactDetailsShape = z.object({
  type: z.literal("paragraph--employee_contact_details"),
  field_name: z.string(),
  field_email: z.string().email().nullable().optional(),
  field_phone: z.string().nullable().optional(),
  field_position: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const ImageSchema = z.object({
  type: z.literal("paragraph--image"),
  id: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const FileAttachmentsSchema = z.object({
  type: z.literal("paragraph--file_attachments"),
  id: z.string(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  field_heading: z.string().nullable(),
  field_file_attachments: z.array(
    z.object({
      type: z.literal("media--document"),
      id: z.string(),
      field_media_document: DocumentShape,
    }),
  ),
});

export const VideoSchema = z.object({
  type: z.literal("paragraph--video"),
  id: z.string(),
  field_video: z
    .object({
      type: z.literal("media--remote_video"),
      id: z.string(),
      name: z.string(),
      field_media_oembed_video: z.string(),
    })
    .nullable(),
});

export const LinksSchema = z.object({
  type: z.literal("paragraph--links"),
  id: z.string(),
  field_links: z.array(LinkShape),
});

const AccordionItemSchema = z.object({
  type: z.literal("paragraph--accordion_item"),
  id: z.string(),
  field_heading: z.string(),
  field_content_elements: z.array(
    z.discriminatedUnion("type", [
      FormattedTextSchema,
      ImageSchema,
      VideoSchema,
      LinksSchema,
      FileAttachmentsSchema,
    ]),
  ),
});

export const AccordionSchema = z.object({
  type: z.literal("paragraph--accordion"),
  id: z.string(),
  field_heading: z.string().nullable(),
  field_accordion_layout: z.enum(["one_column", "two_columns"]),
  field_accordion_items: z.array(AccordionItemSchema),
  field_primary_link: LinkShape.nullable().optional(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable(),
});

export const HeroSchema = z.object({
  type: z.literal("paragraph--hero"),
  id: z.string(),
  field_heading: z.string(),
  field_formatted_text: z
    .object({ processed: z.string().optional() })
    .nullable(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_primary_link: LinkShape.nullable().optional(),
});

export const BannerSchema = z.object({
  type: z.literal("paragraph--banner"),
  id: z.string(),
  field_heading: z.string(),
  field_slogan: z.string().nullable().optional(),
  field_ingress: z.string().nullable().optional(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_primary_link: LinkShape.nullable().optional(),
});

export const ServicesSchema = z.object({
  type: z.literal("paragraph--services"),
  id: z.string(),
  field_heading: z.string().nullable(),
});

export const SubheadingSchema = z.object({
  type: z.literal("paragraph--subheading"),
  id: z.string(),
  field_subheading: z.string(),
});
export const SectionbgSchema = z.object({
  type: z.literal("paragraph--sectionbg"),
  id: z.string(),
  field_heading: z.string(),
  field_formatted_text: z
    .object({
      processed: z.string(),
    })
    .nullable()
    .optional(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_primary_link: LinkShape.nullable().optional(),
});

export const FullWidthParagraphSchema = z.object({
  type: z.literal("paragraph--full_width_paragraph"),
  id: z.string(),

  field_texts: z.array(
    z.object({
      processed: z.string(),
    }),
  ),
  field_images: z.array(
    z.object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    }),
  ),
});

export const TrilogySnapshotSchema = z.object({
  type: z.literal("paragraph--trilogy_snapshot"),
  id: z.string(),
  field_heading: z.string(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_trilogy_images: z.array(
    z.object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    }),
  ),
  field_primary_link: LinkShape.nullable().optional(),
});

export const ParagraphWunderpediaSchema = z.object({
  type: z.literal("paragraph--wunderpedia"),
  id: z.string(),
  field_heading: z.string().nullable().optional(),
  field_formatted_text: z.object({ processed: z.string() }),
  field_links: z.array(LinkShape),
});

export const ScrollingNumbersSchema = z.object({
  type: z.literal("paragraph--scrolling_numbers"),
  id: z.string(),
  field_heading: z.string(),
  field_scrolling_numbers_items: z.array(ScrollingNumberShape),
});

export const ContactDetailsSchema = z.object({
  type: z.literal("paragraph--contact_details"),
  id: z.string(),
  field_heading: z.string().optional().nullable(),
  field_contact_data: z.array(EmployeeContactDetailsShape),
});

export const SimpleQuoteSchema = z.object({
  type: z.literal("paragraph--simple_quote"),
  id: z.string(),
  field_quote: z.string(),
  field_quote_author: z.string(),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
});

export const LogoWallSchema = z.object({
  type: z.literal("paragraph--logo_wall"),
  id: z.string(),
  field_heading: z.string().nullable(),
});

export const WunderStorySchema = z.object({
  type: z.literal("paragraph--wunder_story"),
  id: z.string(),
  field_formatted_text: z.object({ processed: z.string() }),
  field_secondary_link: LinkShape.nullable().optional(),
});
export const AnchorSchema = z.object({
  type: z.literal("paragraph--anchor"),
  id: z.string(),
  field_section_id: z.string().nullable(),
});
export const FrameSchema = z.object({
  type: z.literal("paragraph--frame"),
  id: z.string(),
  field_heading: z.string().nullable().optional(),
  field_formatted_text: z.object({
    processed: z.string(),
  }),
  field_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_dark_image: z
    .object({
      type: z.literal("media--image"),
      id: z.string(),
      field_media_image: ImageShape.nullable(),
    })
    .nullable()
    .optional(),
  field_frame: z.string(),
  field_image_position: z.string().nullable().optional(),
});

export const ArticleBodyTextSchema = z.object({
  type: z.literal("paragraph--article_body_text"),
  id: z.string(),
  field_heading: z.string().nullable().optional(),
  field_formatted_text: z.object({ processed: z.string() }),
});

export type FormattedText = z.infer<typeof FormattedTextSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type Video = z.infer<typeof VideoSchema>;
export type Links = z.infer<typeof LinksSchema>;
export type ScrollingNumbers = z.infer<typeof ScrollingNumbersSchema>;
export type Accordion = z.infer<typeof AccordionSchema>;
export type AccordionItem = z.infer<typeof AccordionItemSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type ListingArticles = z.infer<typeof ListingArticlesSchema>;
export type ListingExpertTalks = z.infer<typeof ListingExpertTalksSchema>;
export type ListingEvents = z.infer<typeof ListingEventsSchema>;
export type FileAttachments = z.infer<typeof FileAttachmentsSchema>;
export type Banner = z.infer<typeof BannerSchema>;
export type Services = z.infer<typeof ServicesSchema>;
export type Subheading = z.infer<typeof SubheadingSchema>;
export type Sectionbg = z.infer<typeof SectionbgSchema>;
export type FullWidthParagraph = z.infer<typeof FullWidthParagraphSchema>;
export type ParagraphWunderpedia = z.infer<typeof ParagraphWunderpediaSchema>;
export type SimpleQuote = z.infer<typeof SimpleQuoteSchema>;
export type LogoWall = z.infer<typeof LogoWallSchema>;
export type TrilogySnapshot = z.infer<typeof TrilogySnapshotSchema>;
export type Anchor = z.infer<typeof AnchorSchema>;
export type WunderStory = z.infer<typeof WunderStorySchema>;
export type Frame = z.infer<typeof FrameSchema>;
export type ArticleBodyText = z.infer<typeof ArticleBodyTextSchema>;
export type ContactDetails = z.infer<typeof ContactDetailsSchema>;

export type Paragraph =
  | FormattedText
  | Image
  | Video
  | Links
  | Accordion
  | AccordionItem
  | Hero
  | ListingArticles
  | ListingExpertTalks
  | ListingEvents
  | FileAttachments
  | Services
  | Subheading
  | Sectionbg
  | FullWidthParagraph
  | Banner
  | ParagraphWunderpedia
  | ScrollingNumbers
  | WunderStory
  | SimpleQuote
  | LogoWall
  | TrilogySnapshot
  | Anchor
  | Frame
  | ArticleBodyText
  | ContactDetails;
