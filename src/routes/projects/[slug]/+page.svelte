<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import ContactCta from '$lib/components/ContactCta.svelte';
	import { PortableText } from '@portabletext/svelte';
	import CollaboratorCard from '$lib/components/CollaboratorCard.svelte';
	export let data;
</script>

<section class="mx-auto">
	<Carousel images={[data.project?.coverImage, ...(data.project?.images || [])]} />
</section>
<section class="details">
	<header>
		<h1 class="text-neutral-50 mt-8 sm:mt-0">{data.project?.title}</h1>
		<div class="metadata">
			<div class="categories">
				{#each data.project?.categories || [] as category}
					<category-tag>
						<a href={`/projects?category=${category.slug?.current}`}>
							{category.title}
						</a>
					</category-tag>
				{/each}
			</div>
			{#if data.project?.collaborators}
				<p>
					{data.project.collaborators.length} collaborator{data.project.collaborators.length > 1
						? 's'
						: ''}
				</p>
			{/if}
			<p>{new Date(data.project.date || '').getFullYear()}</p>
		</div>
	</header>
	{#if data.project?.description}
		<div class="content">
			<PortableText value={data.project?.description} />
		</div>
	{/if}
	{#if data.project.collaborators}
		<h2 class="text-4xl mt-6 md:mt-12">Collaborators</h2>
		<div class="collaborators">
			{#each data.project.collaborators as collaborator, i (collaborator.person._id)}
				<CollaboratorCard {...collaborator} />
			{/each}
		</div>
	{/if}
</section>
<ContactCta />

<style lang="postcss">
	header {
		@apply sm:grid;
		grid-template-columns: 1fr minmax(auto, 200px);
		gap: 10px;
		align-items: flex-start;
	}

	.metadata {
		@apply flex flex-wrap gap-8;
		@apply sm:block;
	}

	.metadata p {
		@apply text-gray-500 my-3;
		@apply text-sm sm:text-end;
	}

	.categories {
		@apply flex flex-wrap items-center sm:justify-end gap-2;
	}

	category-tag {
		@apply bg-slate-700 text-slate-400;
		@apply hover:bg-slate-600 hover:text-slate-200;
		@apply focus:bg-slate-600 focus:text-slate-200;
		@apply py-1 px-3 rounded-full text-sm;
	}

	.details {
		@apply max-w-4xl mx-auto;
		margin-top: -60px;
		position: relative;
		@apply bg-zinc-900 rounded-lg py-5 px-10;
	}

	h1:only-child {
		margin-bottom: 0;
	}

	.content {
		@apply mb-16;
	}

	.collaborators {
		--max-size: 300px;
		@apply grid gap-x-8 gap-y-4;
		grid-template-columns: repeat(auto-fill, minmax(var(--max-size), 1fr));
	}
</style>
