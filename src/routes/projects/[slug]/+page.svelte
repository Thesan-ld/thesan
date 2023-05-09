<script lang="ts">
    import Carousel from '$lib/components/Carousel.svelte';
import { PortableText } from '@portabletext/svelte'
    export let data;
</script>

<section class="max-w-5xl mx-auto my-12">
    <h1>{data.project?.title}</h1>
    <div class="content">
        <PortableText value={data.project?.description}/>
    </div>
</section>
<Carousel images={[data.project?.coverImage, ...data.project?.images || []]} />