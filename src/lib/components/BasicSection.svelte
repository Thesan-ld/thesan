<script lang="ts">
	import type { ExpandedBasicSection, Replace } from '$lib/sanity';
    import { PortableText } from '@portabletext/svelte'
	import ContactForm from './ContactForm.svelte';
	import Cta from './Cta.svelte';

    export let data: ExpandedBasicSection

    const components = {
        types: {
            contactForm: ContactForm,
            cta: Cta
        }
    }
</script>

<section class:hasImage={data.image}
    class:portrait={data.image ? data.image.metadata.dimensions.aspectRatio < 1 : false}
>
    <div class="content">
        <PortableText value={data.content} {components}/>
    </div>
    {#if data.image}
    <figure class:first={data.contentColumn === 'right'}>
        <img src={data.image.url} alt='' />
        <!-- {#if data.image.caption}
        <figcaption>{data.image.caption}</figcaption>
        {/if} -->
    </figure>
    {/if}
</section>

<style lang="postcss">
    section {
        display: grid;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        @apply mb-24;
        @apply max-w-6xl mx-auto;
    }

    section:not(:last-child) {
        @apply mb-12;
    }

    section.hasImage {
        grid-template-columns: 1fr 1fr;
    }

    .content {
        max-inline-size: 800px;
        width: 100%;
        margin-block: 8px; 
        margin-inline-start: 30px;
        align-self: stretch;
    }

    .portrait .content {
        align-self: center;
    }

    .content :global(p:not(:empty)) {
        @apply my-6;
    }

    .content :global(p a) {
        color: hsla(335, 92%, 75%, 1);
    }
    
    .content :global(p a:hover),
    .content :global(p a:focus) {
        color: hsla(335, 98%, 90%, 1);
    }

    /* Contact form styles */
    .content :global(section) {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .content :global(section form) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    .content :global(section label:has(textarea)) {
        flex: 1;
    }

    figure {
        margin: 0;
        position: relative;
        align-self: stretch;
        justify-self: stretch;
        overflow: hidden;
        margin-inline-start: -30px;
    }

    figure.first {
        order: -1;
    }

    figure img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
        object-position: center;
    }

    .portrait figure {
        height: auto;
        max-height: 75vh;
    }

    .portrait img {
        object-fit: contain;
        position: relative;
    }
</style>