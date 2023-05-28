<script lang="ts">
	import PageContent from '$lib/components/PageContent.svelte';
    import SEO from '$lib/components/SEO.svelte';
	import { previewSubscription } from '$lib/sanity';
	import { pageQuery } from '$lib/sanityQueries';
    import type { PageData } from "./$types";
    
    export let data = {} as PageData;

    $: ({ initialData, previewMode, slug } = data);

    $: enabled = previewMode && !!slug

    $: ({ data: pageData } = previewSubscription(pageQuery, {
        params: { slug },
        initialData,
        enabled,
    }));

    $: console.log('content', $pageData?.content);
</script>


<div class="content mt-36">
    <SEO title={$pageData?.seo?.title} description={$pageData?.seo?.description} />
    <PageContent value={$pageData?.content} />
</div>