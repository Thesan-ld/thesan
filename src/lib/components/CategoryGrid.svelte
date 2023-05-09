<script lang='ts'>
    import type * as Schema from '$lib/sanitySchema'
	import type { ExpandedCategoryGrid, Replace } from '$lib/sanity';

    export let data: ExpandedCategoryGrid
</script>

<section>
    {#each data.categories as category (category._id)}
    <a href={`/projects?category=${category.slug?.current}`}>
        <h2>{category.title}</h2>
        <span>View {category.count} project{category.count > 1 ? 's' : ''} ►</span>
    </a>
    {/each}
</section>

<style lang="postcss">
    section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        @apply my-12;
    }

    a {
        border: 1px solid;
        @apply rounded;
        text-decoration: none;
        @apply px-4 py-2;
        @apply bg-neutral-900 border-neutral-800;
    }
</style>