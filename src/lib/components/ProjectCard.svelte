<script lang="ts">
	import type { ExpandedProject } from "$lib/sanity";

    export let project: ExpandedProject;
</script>

<a href={`/projects/${project?.slug?.current}`}>
    <img src={project?.coverImage?.url} alt="" aria-hidden="true" />
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
        border: solid 1px;
        @apply border-violet-500;
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