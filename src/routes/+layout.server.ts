import { publicClient } from "$lib/sanity";
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    const siteSettings = await publicClient.fetch(`
        *[_type == "siteSettings"][0] {
            'logoUrl': companyLogo.asset->url,
            ...,
        }
    `)
    
    const timestamp = new Date()

    return {
        siteSettings,
        timestamp,
    };
}) satisfies LayoutServerLoad;