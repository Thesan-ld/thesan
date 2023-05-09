import type * as Schema from '$lib/sanitySchema'
import { expandedPageContentBodyQuery, type ExpandedPageContent, type Replace } from "./sanity"

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
        'categories': categories[]->,
        'collaborators': collaborators[]->,
    }
`

export type ProjectType = Replace<Schema.Project, 'collaborators', Schema.Collaborator[]>