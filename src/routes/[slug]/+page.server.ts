import { getSanityServerClient } from "$lib/sanity";
import { pageQuery, type PageType } from "$lib/sanityQueries";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals: { previewMode } }) => {
    const page = await getSanityServerClient(previewMode).fetch(
        pageQuery,
        { slug: params.slug }
    ) as PageType

    if (page === null) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return {
        previewMode,
        slug: page?.slug?.current || params.slug,
        initialData: page,
    }
}) satisfies PageServerLoad