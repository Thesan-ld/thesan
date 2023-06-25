import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Collaborator
 *
 *
 */
export interface Collaborator extends SanityDocument {
  _type: "collaborator";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Website — `url`
   *
   *
   */
  website?: string;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Internal Label — `string`
   *
   * This is the label used in Sanity Studio. The SEO title is used for the page title in the browser.
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Content — `pageContent`
   *
   *
   */
  content?: PageContent;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description — `array`
   *
   *
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Cover Image — `image`
   *
   *
   */
  coverImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Collaborators — `array`
   *
   *
   */
  collaborators?: Array<
    SanityKeyed<{
      /**
       * Collaborator — `reference`
       *
       *
       */
      collaborator?: SanityReference<Collaborator>;

      /**
       * Role — `string`
       *
       *
       */
      role?: string;
    }>
  >;

  /**
   * Featured — `boolean`
   *
   *
   */
  featured?: boolean;

  /**
   * Date — `date`
   *
   *
   */
  date?: string;

  /**
   * Sort Offset — `number`
   *
   * Used to offset the sort order of this project on the landing page.
   */
  sortOffset?: number;
}

/**
 * Home Page
 *
 *
 */
export interface HomePage extends SanityDocument {
  _type: "homePage";

  /**
   * Internal Label — `string`
   *
   *
   */
  title?: string;

  /**
   * SEO — `seo`
   *
   *
   */
  seo?: Seo;

  /**
   * Content — `pageContent`
   *
   *
   */
  content?: PageContent;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * Company Name — `string`
   *
   *
   */
  companyName?: string;

  /**
   * Company Logo — `image`
   *
   *
   */
  companyLogo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Navigation — `array`
   *
   *
   */
  navigation?: Array<SanityKeyed<NavigationItem>>;

  /**
   * Default Project Sort — `object`
   *
   *
   */
  defaultProjectSort?: {
    _type: "defaultProjectSort";
    /**
     * Sort By — `string`
     *
     *
     */
    sortBy?: "date" | "title" | "_updatedAt" | "_createdAt";

    /**
     * Sort Direction — `string`
     *
     *
     */
    sortDirection?: "asc" | "desc";
  };

  /**
   * Footer Navigation — `array`
   *
   *
   */
  footerNavigation?: Array<SanityKeyed<NavigationItem>>;

  /**
   * Social Media — `array`
   *
   *
   */
  socialMedia?: Array<SanityKeyed<SocialMediaItem>>;

  /**
   * Footer Text — `array`
   *
   *
   */
  footerText?: Array<SanityKeyed<SanityBlock>>;
}

export type BasicSection = {
  _type: "basicSection";
  /**
   * Internal Label — `string`
   *
   * Only for internal use and will not be displayed on the website.
   */
  title?: string;

  /**
   * Content — `array`
   *
   *
   */
  content?: Array<
    SanityKeyed<SanityBlock> | SanityKeyed<ContactForm> | SanityKeyed<Cta>
  >;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Content Column — `string`
   *
   *
   */
  contentColumn?: "left" | "right";
};

export type CategoryGrid = {
  _type: "categoryGrid";
  /**
   * Internal Label — `string`
   *
   * Only for internal use and will not be displayed on the website.
   */
  title?: string;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;
};

export type ContactForm = {
  _type: "contactForm";
  /**
   * Internal Label — `string`
   *
   * Only for internal use and will not be displayed on the website.
   */
  title?: string;

  /**
   * Pre-form content — `array`
   *
   *
   */
  preFormContent?: Array<SanityKeyed<SanityBlock>>;
};

export type Cta = {
  _type: "cta";
  /**
   * Link URL — `url`
   *
   * The URL to link to.
   */
  url?: string;

  /**
   * Link Text — `string`
   *
   * The text to display.
   */
  text?: string;
};

export type LogoGrid = {
  _type: "logoGrid";
  /**
   * Internal Label — `string`
   *
   * Only for internal use and will not be displayed on the website.
   */
  title?: string;

  /**
   * Section Text Content — `array`
   *
   *
   */
  sectionTextContent?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Columns — `number`
   *
   *
   */
  columns?: number;

  /**
   * Logos — `array`
   *
   *
   */
  logos?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;
};

export type NavigationItem = {
  _type: "navigationItem";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Is Call To Action — `boolean`
   *
   * If true, this navigation item will be styled as a button-like call to action.
   */
  isCallToAction?: boolean;
};

export type PageContent = Array<
  | SanityKeyed<BasicSection>
  | SanityKeyed<ContactForm>
  | SanityKeyed<ProjectCarousel>
  | SanityKeyed<CategoryGrid>
  | SanityKeyed<LogoGrid>
>;

export type ProjectCarousel = {
  _type: "projectCarousel";
  /**
   * Internal Label — `string`
   *
   * Only for internal use and will not be displayed on the website.
   */
  title?: string;

  /**
   * Projects — `array`
   *
   *
   */
  projects?: Array<
    | SanityKeyedReference<Project>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
  >;
};

export type Seo = {
  _type: "seo";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `string`
   *
   *
   */
  description?: string;

  /**
   * Image — `image`
   *
   * Image to display when sharing on social media. If you don not provide an image, a fallback will be used instead.
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Hidden — `boolean`
   *
   * Hide this page from search engines.
   */
  hidden?: boolean;
};

export type SocialMediaItem = {
  _type: "socialMediaItem";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
};

export type Documents =
  | Category
  | Collaborator
  | Page
  | Project
  | HomePage
  | SiteSettings;
