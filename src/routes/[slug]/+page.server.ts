import { getSanityServerClient } from "$lib/sanity";
import { pageQuery, type PageType } from "$lib/sanityQueries";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals: { previewMode } }) => {
    const page = await getSanityServerClient(previewMode).fetch(
        pageQuery,
        { slug: params.slug }
    ) as PageType

    if (page !== null) {
        return {
            previewMode,
            slug: page?.slug?.current || params.slug,
            initialData: page,
        }
    } else {
        return {
            status: 404,
            body: new Error('Page not found')
        }
    }
}) satisfies PageServerLoad