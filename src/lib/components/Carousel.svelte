<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
    export let images: (Schema.SanityImageAsset | undefined)[] = []

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
</script>

<section>
    <button on:click={decrementIndex}>◄ Previous</button>
    <ul class="stage">
        {#each images as image, index (image?._id)}
        <li bind:this={listItems[index]}>
            <figure>
                <img src={image?.url} alt="" />
            </figure>
        </li>
        {/each}
    </ul>
    <button on:click={incrementIndex}>Next ►</button>
    <ul class="dots" aria-hidden="true">
        {#each images || [] as image, index (image?._id)}
        <li>
            <button class:active={index === currentIndex} on:click={() => {
                currentIndex = index;
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
        place-content: center;
        padding-block: 1rem;
    }

    figure {
        margin: 0;
    }

    figure img {
        max-inline-size: 100%;
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

    button:hover {
        @apply bg-black text-white;
    }

    .dots button {
        @apply w-4 h-4 rounded-full;
        display: block;
        padding: 0;
        margin: 0;
        @apply border-slate-400 bg-slate-800;
    }

    .dots button:hover {
        @apply bg-slate-600;
    }

    .dots button.active {
        @apply bg-slate-200 border-slate-200;
    }
</style>