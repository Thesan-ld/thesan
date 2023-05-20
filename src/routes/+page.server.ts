import { getSanityServerClient } from "$lib/sanity";
import type { PageServerLoad } from "./$types";
import { homePageQuery, type HomePageType } from "$lib/sanityQueries";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals: { previewMode }}) => {
    const data = await getSanityServerClient(previewMode).fetch(
        homePageQuery
    ) as HomePageType

    if (data === null) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return {
        page: data
    }
}) satisfies PageServerLoad