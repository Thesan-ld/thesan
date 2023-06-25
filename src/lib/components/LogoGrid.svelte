<script lang='ts'>
	import type { ExpandedLogoGrid } from '$lib/sanity';

    export let data: ExpandedLogoGrid
</script>

<section>
    <ul class="grid" style={`--columns: ${data.columns}`}>
        {#each data.logos as logo (logo._id)}
        <li>
            <img src={logo.url} alt={logo.originalFilename} />
        </li>
        {/each}
    </ul>
</section>

<style lang="postcss">
    section {
        @apply mx-auto my-16 max-w-5xl px-4;
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        --grid-gap: 2rem;
        gap: var(--grid-gap);
        align-items: center;
        justify-content: center;
        @apply my-6;
    }

    li {
        width: calc(100% / var(--columns) - var(--grid-gap));
        margin-block: calc(var(--grid-gap) * 2);
        text-decoration: none;
    }

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
    }
</style>