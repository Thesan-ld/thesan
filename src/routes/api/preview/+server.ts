import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { setPreviewCookie } from '$lib/previewCookie';
import type * as Schema from '$lib/sanitySchema';
import { getSanityServerClient, type ExpandedPageContent, type Replace, expandedPageContentBodyQuery, type ExpandedProject } from '$lib/sanity';
import { error, redirect } from '@sveltejs/kit';
import { pageQuery, projectQuery, type PageType, type ProjectType, homePageQuery, type HomePageType } from '$lib/sanityQueries';

export const GET: RequestHandler = async ({ url, cookies, setHeaders }) => {
	const allParams = url.searchParams;
	const secret = env.VITE_SANITY_PREVIEW_SECRET;
	const incomingSecret = allParams.get('secret');
	const type = allParams.get('type');
	const slug = allParams.get('slug');

	// Check the secret.
	if (secret !== incomingSecret) {
		throw error(401, 'Invalid secret');
	}

	// Check if we have a type and slug parameter.
	if(!slug || !type) {
		throw error(401, 'Missing slug or type');
	}

	// Default redirect. Altnernatively, you can redirect to a 404 page.
	let redirectSlug = '/';
    let isPreviewing = false;

	// Our query may vary depending on the type.
	if (type === 'page') {
		const page = await getSanityServerClient(true).fetch(pageQuery, { slug }) as PageType

		if (!page || !page.slug) {
			throw error(404, 'No page found');
		}

        isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `/${page.slug.current}?isPreview=true`;
	} else if (type === 'homePage') {
		const page = await getSanityServerClient(true).fetch(homePageQuery, { slug }) as HomePageType

		if (!page || !page._id) {
			throw error(404, 'No homepage doc found');
		}

        isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `/?isPreview=true`;
    } else if (type === 'project') {
        const project = await getSanityServerClient(true).fetch(
            projectQuery,
            { slug }
        ) as ProjectType

        if (!project || !project.slug) {
			throw error(404, 'No project found');
		}

        isPreviewing = true;

		// Set the redirect slug and append the isPreview query
		// param, so that the app knows it's a Sanity preview.
		redirectSlug = `/projects/${project.slug.current}?isPreview=true`;
    }

	// Set the preview cookie.
	if(isPreviewing) {
		setPreviewCookie(cookies);
	}

	// Since this endpoint is called from the Sanity Studio on
	// every content change, we'll make sure not to cache it.
	setHeaders({
		'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
	});

	// We don't redirect to url.searchParams.get("slug") as that exposes us to open redirect vulnerabilities,
	throw redirect(302, redirectSlug);
};