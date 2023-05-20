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
    <div class="content">
        <PortableText value={data.project?.description}/>
    </div>
</section>
<ContactCta />

<style lang="postcss">
    .details {
        @apply max-w-5xl mx-auto mb-24;
        margin-top: -60px;
        position: relative;
        @apply bg-zinc-900 rounded-lg py-5 px-10;
    }
</style>