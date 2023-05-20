import { getSanityServerClient } from "$lib/sanity";
import type { PageServerLoad } from "./$types";
import { projectQuery, type ProjectType } from "$lib/sanityQueries";
import { error } from "@sveltejs/kit";

export const load = (async ({ params, locals: { previewMode } }) => {
    const project = await getSanityServerClient(previewMode).fetch(
        projectQuery,
        { slug: params.slug}
    ) as ProjectType

    if (project === null) {
        throw error(404, {
            message: 'Not found'
        });
    }

    return {
        project,
    }
}) satisfies PageServerLoad