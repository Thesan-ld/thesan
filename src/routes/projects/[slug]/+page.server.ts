import { getSanityServerClient } from "$lib/sanity";
import type { PageServerLoad } from "./$types";
import { projectQuery, type ProjectType } from "$lib/sanityQueries";

export const load = (async ({ params, locals: { previewMode } }) => {
    const project = await getSanityServerClient(previewMode).fetch(
        projectQuery,
        { slug: params.slug}
    ) as ProjectType

    if (project) {
        return {
            project,
        }
    } else {
        return {
            status: 500,
            body: new Error('Could not load project')
        }
    }
}) satisfies PageServerLoad