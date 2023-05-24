<script lang="ts">
	import PageContent from '$lib/components/PageContent.svelte';
    import SEO from '$lib/components/SEO.svelte';

    export let data;

    $: console.log({ data });
</script>


<div class="content">
    <SEO title={data.page?.seo?.title} description={data.page?.seo?.description} />
    <PageContent value={data.page?.content} />
</div>