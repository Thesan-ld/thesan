import { getSanityServerClient } from "$lib/sanity";
import type { PageServerLoad } from "./$types";
import { homePageQuery, type HomePageType } from "$lib/sanityQueries";

export const load = (async ({ locals: { previewMode }}) => {
    const data = await getSanityServerClient(previewMode).fetch(
        homePageQuery
    ) as HomePageType

    if (data !== null) {
        return {
            page: data
        }
    } else {
        return {
            status: 404,
            body: new Error('Page not found')
        }
    }
}) satisfies PageServerLoad