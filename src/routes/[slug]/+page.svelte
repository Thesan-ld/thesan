<script lang="ts">
	import PageContent from '$lib/components/PageContent.svelte';
    import SEO from '$lib/components/SEO.svelte';
	import { previewSubscription } from '$lib/sanity';
	import { pageQuery } from '$lib/sanityQueries';
    import type { PageData } from "./$types";
    
    export let data = {} as PageData;

    $: ({ initialData, previewMode, slug } = data);

    $: enabled = previewMode && !!slug

    $: console.log('enabled', enabled)

    $: ({ data: pageData } = previewSubscription(pageQuery, {
        params: { slug },
        initialData,
        enabled,
    }));
</script>


<div class="content">
    <SEO title={$pageData?.seo?.title} description={$pageData?.seo?.description} />
    <PageContent value={$pageData?.content} />
</div>