<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
	import { PortableText } from '@portabletext/svelte';
	import BasicSection from './BasicSection.svelte';
	import CategoryGrid from './CategoryGrid.svelte';
	import ContactForm from './ContactForm.svelte';
	import ProjectCarousel from './ProjectCarousel.svelte';
	import type { ExpandedPageContent } from '$lib/sanity';
    export let value: ExpandedPageContent = [];
</script>

{#each value as block (block._key)}
    {#if block._type === 'basicSection'}
        <BasicSection data={block} />
    {:else if block._type === 'categoryGrid'}
        <CategoryGrid data={block} />
    {:else if block._type === 'contactForm'}
        <ContactForm data={block} />
    {:else if block._type === 'projectCarousel'}
        <ProjectCarousel data={block} />
    {/if}
{/each}
