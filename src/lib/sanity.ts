import {createClient} from "@sanity/client";
import type * as Schema from "./sanitySchema";
import { createPreviewSubscriptionStore } from "./sveltekit-sanity/previewSubscriptionStore";

const isProd = import.meta.env.PROD;

const sanityClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2023-04-29",
  useCdn: typeof document !== 'undefined' && isProd,
}

export const publicClient = createClient(sanityClientConfig);

export const previewClient = createClient({
  ...sanityClientConfig,
  useCdn: false,
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN || '',
})

export const getSanityServerClient = (usePreview: boolean) => (usePreview ? previewClient : publicClient)

export const previewSubscription = createPreviewSubscriptionStore(sanityClientConfig);


// Allows us to mark if we have replaced asset references with their actual data
// Bless up to https://stackoverflow.com/questions/51599481/replacing-property-of-a-typescript-type
type Identity<T> = { [P in keyof T]: T[P] }
export type Replace<T, K extends keyof T, TReplace> = Identity<Pick<T, Exclude<keyof T, K>> & {
    [P in K] : TReplace
}>

export type WithSanityKey<T> = (T & { _key: string })
export type WithCount<T> = T & { count: number }

export type ExpandedProject = Replace<
  PartiallyExpandedProject,
  'categories',
  Schema.Category[]
>

export type PartiallyExpandedProject = Replace<
  Replace<
    Schema.Project,
    'coverImage',
    Schema.SanityImageAsset
  >,
  'images',
  Schema.SanityImageAsset[]
>

export type ExpandedBasicSection = Replace<Schema.BasicSection, 'image', Schema.SanityImageAsset>
export type ExpandedCategoryGrid = Replace<
  Replace<Schema.CategoryGrid, 'categories', Schema.Category[]>,
  'categories',
  WithCount<Schema.Category>[]
>
export type ExpandedProjectCarousel = Replace<
  Schema.ProjectCarousel,
  'projects',
  (PartiallyExpandedProject | Schema.SanityImageAsset)[]
>


type UnmodifiedPageContentBlocks = Exclude<Schema.PageContent[0], 
  Schema.BasicSection |
  Schema.CategoryGrid |
  Schema.ProjectCarousel
>

export type ExpandedPageContent = (
    WithSanityKey<ExpandedBasicSection> |
    WithSanityKey<ExpandedCategoryGrid> |
    WithSanityKey<ExpandedProjectCarousel> |
    UnmodifiedPageContentBlocks
  )[]

export type AltProjectType = {
  _type: 'project' | 'image',
  _id: string,
  title?: string,
  slug?: Schema.Project['slug'],
  image: Schema.SanityImageAsset
}


export type AltProjectCarouselType = Replace<
  Schema.ProjectCarousel,
  'projects',
  AltProjectType[]
>

export type PageContentType = (
  WithSanityKey<Schema.BasicSection> |
  WithSanityKey<ExpandedCategoryGrid> |
  WithSanityKey<AltProjectCarouselType>
)

export const expandedPageContentBodyQuery = `
  ...,
  content[] {
      _type == "basicSection" => {
          ...,
          'image': image.asset->
      },
      _type == "categoryGrid" => {
          ...,
          categories[]->,
      },
      _type == "projectCarousel" => {
          ...,
          projects[] {
              _type,
              _id,
              _type == "reference" => @-> {
                _type,
                title,
                slug,
                'image': coverImage.asset->,
              },
              _type == "image" => {
                "image": asset->
              }
          }
      },
  },
`