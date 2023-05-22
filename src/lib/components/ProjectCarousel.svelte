<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { ExpandedProject, ExpandedProjectCarousel } from '$lib/sanity';
	import ProjectCard from './ProjectCard.svelte';
	export let data: ExpandedProjectCarousel;

	$: console.log({ data });

	let listItems = [] as HTMLLIElement[];
	let currentIndex = 0;
	let previousIndex = 0;
	$: forwardIndex = currentIndex === data.projects.length - 1 ? 0 : currentIndex + 1;
	$: backwardIndex = currentIndex === 0 ? data.projects.length - 1 : currentIndex - 1;
	$: shouldMoveFromLeft = !(previousIndex === currentIndex - 1
		|| (currentIndex === 0 && previousIndex === data.projects.length - 1));
	const incrementIndex = () => {
		previousIndex = currentIndex;
		currentIndex = currentIndex === listItems.length - 1 ? 0 : currentIndex + 1;
	};
	const decrementIndex = () => {
		previousIndex = currentIndex;
		currentIndex = currentIndex === 0 ? listItems.length - 1 : currentIndex - 1;
	};

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
		<button
			class="step-btn"
			on:click={() => {
				decrementIndex();
				resetInterval();
			}}>
			<div class="text-wrapper">
				<span>Previous</span>
			</div>
			<div class="img-wrapper">
				<img src={data?.projects[backwardIndex]?.coverImage?.url} alt="" />
			</div>
		</button>
	{/if}
	<ul class="stage">
		{#each data?.projects || [] as project, index (project?._id)}
			<li bind:this={listItems[index]}
				class:active={currentIndex == index}
				class:fromLeft={shouldMoveFromLeft}
				class:portrait={project?.coverImage?.metadata?.dimensions?.aspectRatio < 1}
			>
				<ProjectCard {project} />
			</li>
		{/each}
	</ul>
	{#if data?.projects?.length > 1}
		<button
			class="step-btn"
			on:click={() => {
				incrementIndex();
				resetInterval();
			}}
		>
			<div class="text-wrapper">
				<span>Next</span>
			</div>
			<div class="img-wrapper">
				<img src={data?.projects[forwardIndex]?.coverImage?.url} alt="" />
			</div>
		</button>
	{/if}
	<ul class="dots" aria-hidden="true">
		{#each data?.projects || [] as project, index (project?._id)}
			<li>
				<button
					class:active={index === currentIndex}
					on:click={() => {
						currentIndex = index;
						resetInterval();
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
		display: grid;
		place-content: center;
		@apply sr-only;
	}

	.stage li.active {
		--dir: 1; /* from the right by default */
		@apply not-sr-only;
		animation: slide .3s ease-out forwards;
		min-inline-size: 100%;
		min-block-size: 600px;
		block-size: 100%;
	}

	.stage li.fromLeft {
		--dir: -1; /* from the left */
	}

	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(calc(var(--dir) * 10px));
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.stage li > :global(a) {
		@apply absolute inset-0;
	}

	.stage li.portrait :global(img) {
        object-fit: contain;
    }

	.step-btn {
		--outline: black;
        --thickness: 1px;
		text-shadow:
            calc(-1 * var(--thickness)) calc(-1 * var(--thickness)) 0 var(--outline),
            var(--thickness) calc(-1 * var(--thickness)) 0 var(--outline),
            calc(-1 * var(--thickness)) var(--thickness) 0 var(--outline),
			var(--thickness) var(--thickness) 0 var(--outline);
		--inset: -5px;
		--swing: 12deg;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 180px;
		left: var(--inset);
		z-index: 1;
		@apply text-zinc-400 hover:text-zinc-50;
		letter-spacing: 0.1ch;
		font-family: 'Poppins', sans-serif;
		font-weight: 200;
		background: transparent;
		border: none;
		font-size: 2rem;
		transform-origin: center;
		text-align: center;
	}

	.text-wrapper {
		position: absolute;
		inset: 0;
		display: grid;
		align-content: center;
		justify-content: flex-start;
		transform-origin: top left;
		transform: rotate(0);
		transition: transform .11s ease-out;
	}

	.text-wrapper span {
		transform-origin: center;
        transform: translateX(-50%) rotate(90deg) translateY(-100%);
	}

	.step-btn:last-of-type .text-wrapper span {
		transform: translateX(50%) rotate(-90deg) translateY(-100%);
	}

	.step-btn:last-of-type .text-wrapper {
		transform-origin: top right;
		justify-content: flex-end;
	}

	.step-btn:hover .text-wrapper {
		transform: rotate(calc(-1 * var(--swing)));
	}

	.step-btn:last-of-type:hover .text-wrapper {
		transform: rotate(var(--swing));
	}

	.step-btn .img-wrapper {
		position: absolute;
		top: 0;
		z-index: -1;
		@apply h-full w-full;
		clip-path: polygon(0 0, 0 100%, 0 100%);
		transition: clip-path .11s ease-out;
	}

	.step-btn:last-of-type .img-wrapper {
		clip-path: polygon(100% 0, 100% 100%, 100% 100%);
	}

	.step-btn img {
		@apply h-full w-full object-cover;
		object-position: center;
	}

	button.step-btn:last-of-type {
		left: auto;
		right: var(--inset);
	}

	.step-btn:hover .img-wrapper {
		clip-path: polygon(0 0, 100% 100%, 0 100%);
	}

	.step-btn:last-of-type:hover .img-wrapper {
		clip-path: polygon(100% 0, 100% 100%, 0 100%);
	}

	.dots button {
		@apply w-3 h-3 rounded-full;
		display: block;
		padding: 0;
		margin: 0;
		border: solid 1px;
		@apply border-slate-400 bg-zinc-900;
	}

	.dots button:hover {
		@apply bg-slate-600;
	}

	.dots button.active {
		@apply bg-slate-200 border-slate-200;
	}
</style>
