import { getSanityServerClient } from "$lib/sanity";
import type { PageServerLoad } from "./$types";
import { homePageQuery, type HomePageType } from "$lib/sanityQueries";
import { error, type Actions, redirect } from "@sveltejs/kit";

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

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        console.log('post', formData);

        throw redirect(303, '/contact-success')
    }
} satisfies Actions