<script lang="ts">
	import Fuse from 'fuse.js'
    import { page } from "$app/stores";
	import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type * as Schema from '$lib/sanitySchema';
	import type { ExpandedProject } from '$lib/sanity.js';
	import { goto } from '$app/navigation';
	import ContactCta from '$lib/components/ContactCta.svelte';

    export let data; 

    $: categoryParam = $page.url.searchParams.get('category')
    const isCurrentCategory = (category: Schema.Category) => category.slug?.current === categoryParam;
    $: filteredProjects = ((categoryParam) ? data.projects?.filter(project => project.categories?.some(isCurrentCategory)) : data.projects)
    $: offsetProjects = applyOffsets(filteredProjects);

    function applyOffsets<T extends { sortOffset?: number }>(
        arrayWithOffsets?: T[]
    ): T[] | undefined {
        if (!arrayWithOffsets) return;
        const returnArray = [] as typeof arrayWithOffsets;
        let forwardOffsets = [] as [number, typeof arrayWithOffsets[0]][];
        let insertedElementCount = 0

        arrayWithOffsets.forEach((item, index) => {
            const foundForwardOffset = forwardOffsets.find(([offsetIndex]) => offsetIndex === index);
            if (foundForwardOffset) {
                returnArray.push(foundForwardOffset[1]);
                forwardOffsets = forwardOffsets.filter(([offsetIndex]) => offsetIndex !== index); // remove from forwardOffsets
                insertedElementCount++;
            }

            if (!item.sortOffset) {
                returnArray.push(item);
            } else if (item.sortOffset < 0) {
                returnArray.splice(Math.max(index + (item.sortOffset || 0), 0), 0, item);
                insertedElementCount++;
            } else {
                forwardOffsets.push([index + item.sortOffset + insertedElementCount, item]);
            }
        })

        return [...returnArray, ...forwardOffsets.map(([, item]) => item)];
    }

    $: fuse = new Fuse(offsetProjects as readonly ExpandedProject[], {
        keys: ['title', 'categories.title'],
        threshold: 0.5,
    })
    let searchTerm = $page.url.searchParams.get('search');

    $: searchedProjects = (searchTerm) 
        ? fuse.search(searchTerm).map(result => result.item)
        : offsetProjects;
</script>

<section class="p-8 max-w-5xl mx-auto mt-36 mb-12 top-area">
    <h1>Projects</h1>
    <div class="controls">
        <div>
            <label for="search" class="sr-only">Search projects</label>
            <input type="search" name="search" placeholder="Search projects"
                on:input={(event) => {
                    searchTerm = event.currentTarget.value
                    if (!searchTerm) $page.url.searchParams.delete('search')
                    else {
                        $page.url.searchParams.set('search', searchTerm)
                    }
                    goto($page.url.searchParams ? '?' + $page.url.searchParams.toString() : '', { replaceState: true, keepFocus: true })
                }}
                value={searchTerm}
                class="p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-transparent"
            />
        </div>
        <div class="categories-wrapper">
            <p class="sr-only">Filter by category:</p>
            <ul class="categories">
                <li>
                    <a href="/projects" class={(!categoryParam) ? ' current' : ''}>
                        All <small>{data.projects?.length}</small>
                    </a>
                </li>
                {#each data.categories || [] as category}
                <li>
                    <a href="/projects?category={category.slug?.current}" class={(categoryParam === category.slug?.current) ? ' current' : ''}>
                        {category.title} <small>{data.projects?.reduce((acc, project) => acc + (project.categories?.some(c => c._id === category._id) ? 1 : 0), 0)}</small>
                    </a>
                </li>
                {/each}
            </ul>
        </div>
    </div>
</section>
<section class="project-grid">
    {#each searchedProjects || [] as project, index (project._id)}
        <ProjectCard {project} />
    {/each}
</section>
<ContactCta />

<style lang="postcss">
    small {
        @apply font-normal text-sm;
        vertical-align: text-bottom;
        display: inline-grid;
        width: 2.5ch;
        height: 2.5ch;
        place-content: center;
        line-height: 1;
        @apply p-1 rounded-full bg-slate-700 text-slate-400;
    }

    .current small {
        @apply bg-slate-500 text-slate-200;
    }

    .controls {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        user-select: none;
    }

    .categories-wrapper {
        display: flex;
        gap: 1rem;
        font-size: 18px;
        margin-block: 2rem;
        @apply text-gray-500;
    }

    .categories {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .categories li {
        margin-inline: 1rem;
        margin-block: 10px;
    }

    .categories a {
        text-decoration: none;
        color: inherit;
        font-size: 18px;
        @apply text-slate-600 hover:text-slate-500 focus:text-slate-500;
    }

    .categories a.current {
        @apply text-slate-400;
    }

    .top-area {
        display: flex;
        align-items: space-between;
        gap: 120px;
    }
    
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 200px;
        grid-gap: 1rem;
    }
</style>