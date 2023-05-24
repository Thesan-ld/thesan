import type * as Schema from '$lib/sanitySchema'
import { expandedPageContentBodyQuery, type ExpandedPageContent, type Replace } from "./sanity"

export const countReferences = (otherTypeName: string) => `
    count(*[_type == "${otherTypeName}" && references(^._id)])
`

export const pageQuery = `
    *[_type == "page" && slug.current == $slug][0] {
        ${expandedPageContentBodyQuery}
    }
`

export type PageType = Replace<Schema.Page, 'content', ExpandedPageContent>

export const homePageQuery = `
    *[_type == "homePage"][0] {
        ${expandedPageContentBodyQuery}
    }
`

export type HomePageType = Replace<Schema.HomePage, 'content', ExpandedPageContent>

export const projectQuery = `
    *[_type == "project" && slug.current == $slug][0] {
        ...,
        'coverImage': coverImage.asset->,
        'images': images[].asset->,
        categories[]->,
        collaborators[] {
            role,
            'person': collaborator->{ ..., 'image': image.asset-> }
        }
    }
`

export type CollaboratorType = Replace<
    Schema.Collaborator,
    'image',
    Schema.SanityImageAsset
>

export type ProjectType = Replace<
    Replace<
        Replace<
            Replace<
                Schema.Project,
                'collaborators',
                {
                    role: string,
                    person: CollaboratorType
                }[]
            >,
            'categories',
            Schema.Category[]
        >,
        'images',
        Schema.SanityImageAsset[]
    >,
    'coverImage',
    Schema.SanityImageAsset
>