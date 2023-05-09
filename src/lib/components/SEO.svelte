<script lang="ts">
    import { page } from '$app/stores';

    export let title: string = 'Thesan Lighting Design';
    export let description: string ='A lighting studio in New York City by Pamela Kupper';
    export let image: string = '';
    export let url: string = $page.url.host + $page.url.pathname;

    let appendedTitle = title.includes('Thesan Lighting Design') ? title : title + ' | Thesan Lighting Design';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={appendedTitle} />
    {#if image}
    <meta property="image" content={image} />
    <meta name="twitter:image" content={image} />
    {/if}
    <meta name="twitter:title" content={appendedTitle} />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:description" content={description} />
</svelte:head>