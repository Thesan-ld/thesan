<script lang="ts">
	import Fuse from 'fuse.js'
	import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type * as Schema from '$lib/sanitySchema';
	import type { ExpandedProject } from '$lib/sanity.js';
	import { goto } from '$app/navigation';
	import ContactCta from '$lib/components/ContactCta.svelte';
	import { onMount } from 'svelte';

    export let data; 

    let searchParams: URLSearchParams | undefined;
    let categoryParam = ''
    let searchTerm = ''
    const isCurrentCategory = (category: Schema.Category) => category.slug?.current === categoryParam;
    $: filteredProjects = ((categoryParam) ? data.projects?.filter(project => project.categories?.some(isCurrentCategory)) : data.projects)
    $: offsetProjects = applyOffsets(filteredProjects);

    onMount(() => {
        searchParams = new URL(window.location.toString()).searchParams
        categoryParam = searchParams.get('category') || '';
        searchTerm = searchParams.get('search') || '';
    })

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

    $: searchedProjects = (searchTerm) 
        ? fuse.search(searchTerm).map(result => result.item)
        : offsetProjects;
</script>

<section class="p-8 mx-4 mt-36 top-area">
    <h1>Projects</h1>
    <div class="controls">
        <div class="search-wrap">
            <label for="search">
                <span class="sr-only">Search projects</span>
                <img src="/search-icon.svg" alt="" width="17" />
            </label>
            <input type="search" name="search" placeholder={`Search ${offsetProjects?.length || 'all'}${categoryParam ? (' ' + categoryParam) : ''} projects`}
                on:input={(event) => {
                    searchTerm = event.currentTarget.value
                    if (!searchTerm) searchParams?.delete('search')
                    else {
                        searchParams?.set('search', searchTerm)
                    }
                    goto(searchParams ? '?' + searchParams.toString() : '', { replaceState: true, keepFocus: true })
                }}
                value={searchTerm}
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
        <ProjectCard {project} maxSize={500} />
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
        @apply p-1 rounded-full bg-slate-800 text-slate-400;
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

    .search-wrap {
        background: hsla(315, 82%, 30%, 0.3);
        @apply rounded;
        display: flex;
        align-items: center;
        padding: 2px;
        padding-inline-end: 5px;
        gap: 5px;
        width: min(100%, 350px);
    }

    .search-wrap label {
        order: 2;
    }

    .search-wrap input {
        border: 0;
        @apply bg-slate-800 rounded-s px-2 py-1;
        flex: 1;
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
        gap: .5rem;
        justify-content: flex-end;
        max-width: 600px;
    }

    .categories li {
        margin-block: 5px;
    }

    .categories a {
        text-decoration: none;
        color: inherit;
        font-size: 18px;
        @apply flex gap-2 items-center;
        @apply text-slate-400;
        @apply border border-neutral-800 px-3 py-0.5 rounded-full;
    }

    a:not(.current) {
        @apply hover:text-slate-500 focus:text-slate-500;
    }

    a.current {
        color: hsla(335, 96%, 60%, 1);
        background: hsla(315, 82%, 30%, 0.3);
    }

    a.current small {
        color: rgb(255, 78, 152);
        background: hsla(315, 79%, 45%, 0.57);
    }


    .top-area {
        display: flex;
        justify-content: space-between;
        gap: 120px;
    }
    
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 200px;
        grid-gap: 1rem;
    }
</style>