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
  Replace<
    Replace<Schema.Project, 'coverImage', Schema.SanityImageAsset>,
    'images',
    Schema.SanityImageAsset[]
  >,
  'categories',
  Schema.Category[]
>

export type ExpandedBasicSection = Replace<Schema.BasicSection, 'image', Schema.SanityImageAsset>
export type ExpandedCategoryGrid = Replace<
  Replace<Schema.CategoryGrid, 'categories', Schema.Category[]>,
  'categories',
  WithCount<Schema.Category>[]
>
export type ExpandedProjectCarousel = Replace<
  Replace<Schema.ProjectCarousel, 'projects', Schema.Project[]>,
  'projects',
  ExpandedProject[]
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


export const expandedPageContentBodyQuery = `
  ...,
  content[] {
      ...,
      "image": image { ...asset-> },
      categories[]-> {
          ...,
          "count": count(*[_type == "project" && references(^._id)])
      },
      projects[]->{
          ...,
          "coverImage": coverImage.asset->,
          "images": images[].asset->,
      },
  },
`