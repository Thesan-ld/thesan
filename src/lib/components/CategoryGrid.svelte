<script lang='ts'>
	import type { ExpandedCategoryGrid, Replace } from '$lib/sanity';

    export let data: ExpandedCategoryGrid
</script>

<section>
    <h2 class="text-slate-200 mb-4">Browse by category</h2>
    <p class="text-slate-400">
        Lighting is a functional element of our lives;<br/>
        design is a defining element of our experience.
    </p>
    <ul class="grid">
        {#each data.categories as category (category._id)}
        <li>
            <a href={`/projects?category=${category.slug?.current}`}>
                <h3 class="text-xl text-slate-50 mt-0 mb-1">{category.title}</h3>
                <span class="text-slate-400">{category.count} project{category.count > 1 ? 's' : ''}</span>
            </a>
        </li>
        {/each}
    </ul>
</section>

<style lang="postcss">
    section {
        @apply mx-auto my-16 max-w-5xl px-4;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.2rem;
        @apply my-6;
    }

    li {
        @apply rounded;
        text-decoration: none;
    }
    
    li a {
        position: relative;
        background: radial-gradient(96.21% 424.91% at 96.37% 100.01%, #b74c1b 0%, #e5c070 100%);
        @apply px-4 py-2 rounded;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 1;
    }

    li a:hover,
    li a:focus {
        background: #FE7E43;
    }

    li a::after {
        content: '';
        position: absolute;
        inset: 2px;
        @apply bg-zinc-900;
        z-index: -1;
    }

    li a:hover::after,
    li a:focus::after {
        @apply bg-zinc-800;
    }
</style>