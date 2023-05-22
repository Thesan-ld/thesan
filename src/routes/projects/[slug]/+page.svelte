<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte';
	import ContactCta from '$lib/components/ContactCta.svelte';
    import { PortableText } from '@portabletext/svelte'
    export let data;
</script>

<section class="mx-auto">
    <Carousel images={[data.project?.coverImage, ...data.project?.images || []]} />
</section>
<section class="details">
    <h1>{data.project?.title}</h1>
    {#if data.project?.description}
    <div class="content">
        <PortableText value={data.project?.description}/>
    </div>
    {/if}
</section>
<ContactCta />

<style lang="postcss">
    .details {
        @apply max-w-5xl mx-auto;
        margin-top: -60px;
        position: relative;
        @apply bg-zinc-900 rounded-lg py-5 px-10;
    }

    h1:only-child {
        margin-bottom: 0;
    }
</style>