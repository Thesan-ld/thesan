import { publicClient, type ExpandedProject } from "$lib/sanity";
import type * as Schema from '$lib/sanitySchema';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const projectsPromise = publicClient.fetch(`*[_type == "project"] {
        ...,
        'coverImage': coverImage.asset->,
        'images': images[].asset->,
        'categories': categories[]->,
    }`) as Promise<ExpandedProject[]>

    const categoriesPromise = publicClient.fetch(`*[_type == "category"]`) as Promise<Schema.Category[]>

const [projects, categories] = await Promise.all([projectsPromise, categoriesPromise])

    if (projects && categories) {
        return {
            projects: projects,
            categories: categories,
        }
    } else {
        return {
            status: 500,
            body: new Error('Could not load projects')
        }
    }
}) satisfies PageServerLoad