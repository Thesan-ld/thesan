<script lang="ts">
	import type { AltProjectType, ExpandedProject } from "$lib/sanity";

    export let project: any
    export let maxSize: number | undefined = undefined
</script>

<a href={`/projects/${project?.slug?.current}`}>
    <img src={((project?.image?.url) ? project?.image?.url : project?.coverImage?.url) + (maxSize ? '?w=' + maxSize : '')}
        alt="" aria-hidden="true" loading="lazy"
    />
    <span>{project?.title}</span>
</a>

<style lang="postcss">
    a {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        overflow: hidden;
        transition: border-radius var(--t);
    }

    img {
        object-fit: cover;
        height: 100%;
        max-width: none;
    }

    span {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        @apply text-white bg-black;
        border: solid 1px hsla(19, 99%, 63%, 1);
        @apply px-4 py-2 rounded;
        transition: transform var(--t), opacity var(--t);
        opacity: 0;
    }

    a:hover span,
    a:focus-within span {
        transform: translateY(-10%);
        opacity: 1;
    }

    a:hover,
    a:focus-within {
        @apply rounded-2xl;
    }
</style>