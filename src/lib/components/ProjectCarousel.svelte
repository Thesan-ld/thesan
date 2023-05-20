<script lang="ts">
	import type { ExpandedProject, ExpandedProjectCarousel } from '$lib/sanity';
	import ProjectCard from './ProjectCard.svelte';
	export let data: ExpandedProjectCarousel;

	$: console.log({ data });

	let listItems = [] as HTMLLIElement[];
	let currentIndex = 0;
	$: nextIndex = currentIndex === data.projects.length - 1 ? 0 : currentIndex + 1;
	$: previousIndex = currentIndex === 0 ? data.projects.length - 1 : currentIndex - 1;
	$: currentImage = listItems[currentIndex];
	const incrementIndex = () => {
		currentIndex = currentIndex === listItems.length - 1 ? 0 : currentIndex + 1;
	};
	const decrementIndex = () => {
		currentIndex = currentIndex === 0 ? listItems.length - 1 : currentIndex - 1;
	};

	// function updateScroll(el: HTMLLIElement) {
	//     el?.scrollIntoView({
	//         behavior: 'smooth',
	//         block: 'nearest',
	//         inline: 'center',
	//     })
	// }

	// $: updateScroll(currentImage)

	// const intervalLength = 5000
	// let interval = setInterval(() => {
	//     incrementIndex()
	// }, intervalLength)

	// function resetInterval() {
	//     clearInterval(interval)
	//     interval = setInterval(() => incrementIndex(), intervalLength)
	// }
</script>

<section>
	{#if data?.projects?.length > 1}
		<button
			class="step-btn"
			on:click={() => {
				decrementIndex();
				// resetInterval();
			}}>Previous</button
		>
	{/if}
	<ul class="stage">
		{#each data?.projects || [] as project, index (project?._id)}
			<li bind:this={listItems[index]} class:active={currentIndex == index}>
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
	{#if data?.projects?.length > 1}
		<button
			class="step-btn"
			on:click={() => {
				incrementIndex();
				// resetInterval();
			}}
		>
			Next
			<!-- <img src={data?.projects[nextIndex]?.mainImage?.asset?.url} alt="" /> -->
		</button>
	{/if}
	<ul class="dots" aria-hidden="true">
		{#each data?.projects || [] as project, index (project?._id)}
			<li>
				<button
					class:active={index === currentIndex}
					on:click={() => {
						currentIndex = index;
						// resetInterval();
					}}
				/>
			</li>
		{/each}
	</ul>
</section>

<style lang="postcss">
	section {
		gap: 1rem;
		@apply mx-auto;
		position: relative;
		block-size: 100vh;
	}

	ul {
		display: flex;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.stage {
		block-size: 100%;
	}

	.dots {
		position: absolute;
		bottom: 10px;
		display: flex;
		justify-content: center;
		width: 100%;
		gap: 1ch;
	}

	.stage li {
		scroll-snap-align: center;
		scroll-snap-stop: always;
		display: grid;
		min-inline-size: 100%;
		min-block-size: 600px;
		block-size: 100%;
		place-content: center;
		@apply sr-only;
	}

	.stage li.active {
		@apply not-sr-only;
	}

	.stage li > :global(a) {
		@apply max-w-full h-full;
	}

    .stage li > :global(img) {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
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
		--outline: black;
        --thickness: 1px;
		text-shadow:
            calc(-1 * var(--thickness)) calc(-1 * var(--thickness)) 0 var(--outline),
            var(--thickness) calc(-1 * var(--thickness)) 0 var(--outline),
            calc(-1 * var(--thickness)) var(--thickness) 0 var(--outline),
			var(--thickness) var(--thickness) 0 var(--outline);
	}

	button.step-btn {
		--inset: 40px;
		position: absolute;
		top: 50%;
		left: var(--inset);
		z-index: 1;
		color: white;
		letter-spacing: 0.1ch;
		font-family: 'Poppins', sans-serif;
		background: transparent;
		border: none;
		font-size: 2rem;
		transform-origin: center;
		text-align: center;
		transform: translate(-50%, -50%) rotate(90deg);
	}

	button.step-btn:last-of-type {
		left: auto;
		right: var(--inset);
		transform: translate(50%, -50%) rotate(-90deg);
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
