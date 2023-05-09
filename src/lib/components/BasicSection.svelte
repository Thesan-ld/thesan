<script lang="ts">
	import type { ExpandedBasicSection, Replace } from '$lib/sanity';
    import type * as Schema from '$lib/sanitySchema';
    import { PortableText } from '@portabletext/svelte'
	import ContactForm from './ContactForm.svelte';

    export let data: ExpandedBasicSection

    const components = {
        types: {
            contactForm: ContactForm
        }
    }
</script>

<section>
    <div class="content">
        <PortableText value={data.content} {components}/>
    </div>
    {#if data.image}
    <figure class={data.contentColumn === 'right' ? 'first' : ''}>
        <img src={data.image.url} alt='' />
        <!-- {#if data.image.caption}
        <figcaption>{data.image.caption}</figcaption>
        {/if} -->
    </figure>
    {/if}
</section>

<style lang="postcss">
    section {
        display: flex;
        align-items: center;
        gap: 1rem;
        @apply my-12;
        @apply max-w-5xl mx-auto;
    }

    .content {
        max-inline-size: 800px;
        margin: 0 auto;
    }

    section:has(figure) .content {
        padding-inline-end: 2rem;
    }

    figure {
        margin: 0;
    }

    figure.first {
        order: -1;
    }

    figure img {
        max-inline-size: 100%;
    }
</style>