<script lang="ts">
	import type { ExpandedProject, ExpandedProjectCarousel } from '$lib/sanity';
	import ProjectCard from './ProjectCard.svelte';
    export let data: ExpandedProjectCarousel

    $: console.log({ data })

    let listItems = [] as HTMLLIElement[]
    let currentIndex = 0
    $: currentImage = listItems[currentIndex]
    const incrementIndex = () => { currentIndex = (currentIndex === listItems.length - 1) ? 0 : currentIndex + 1 }
    const decrementIndex = () => { currentIndex = (currentIndex === 0) ? listItems.length - 1 : currentIndex - 1 }

    function updateScroll(el: HTMLLIElement) {
        el?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        })
    }

    $: updateScroll(currentImage)

    const intervalLength = 5000
    let interval = setInterval(() => {
        incrementIndex()
    }, intervalLength)

    function resetInterval() {
        clearInterval(interval)
        interval = setInterval(() => incrementIndex(), intervalLength)
    }
</script>

<section>
    {#if data?.projects?.length > 1}
    <button on:click={() => {
        decrementIndex();
        resetInterval();
    }}>◄ Previous</button>
    {/if}
    <ul class="stage">
        {#each data?.projects || [] as project, index (project?._id)}
        <li bind:this={listItems[index]}>
            <ProjectCard {project} />
        </li>
        {/each}
    </ul>
    {#if data?.projects?.length > 1}
    <button on:click={() => {
        incrementIndex();
        resetInterval();
    }}>Next ►</button>
    {/if}
    <ul class="dots" aria-hidden="true">
        {#each data?.projects || [] as project, index (project?._id)}
        <li>
            <button class:active={index === currentIndex} on:click={() => {
                currentIndex = index;
                resetInterval();
            }}></button>
        </li>
        {/each}
    </ul>
</section>

<style lang="postcss">
    section {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        @apply mx-auto;
    }

    ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .stage {
        overflow-x: auto;
        scroll-snap-type: x mandatory;
    }

    .dots {
        grid-column: 2 / span 1;
        justify-self: center;
    }

    .stage li {
        scroll-snap-align: center;
        scroll-snap-stop: always;
        display: grid;
        min-inline-size: 100%;
        min-block-size: 600px;
        place-content: center;
        padding-block: 1rem;
    }

    button {
        @apply bg-white text-black;
        border: 1px solid black;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        height: fit-content;
        font-weight: bold;
        cursor: pointer;
    }

    .dots button {
        @apply w-4 h-4 rounded-full;
        display: block;
        padding: 0;
        margin: 0;
        @apply border-slate-400 bg-slate-800;
    }

    button:hover {
        @apply bg-black text-white;
    }

    .dots button:hover {
        @apply bg-slate-600;
    }

    .dots button.active {
        @apply bg-slate-200 border-slate-200;
    }
</style>