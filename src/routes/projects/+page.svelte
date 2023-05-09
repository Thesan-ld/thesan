<script lang="ts">
	import Fuse from 'fuse.js'
    import { page } from "$app/stores";
	import ProjectCard from "$lib/components/ProjectCard.svelte";
    import type * as Schema from '$lib/sanitySchema';
	import type { ExpandedProject } from '$lib/sanity.js';
	import { goto } from '$app/navigation';

    export let data; 

    $: categoryParam = $page.url.searchParams.get('category')
    const isCurrentCategory = (category: Schema.Category) => category.slug?.current === categoryParam;
    $: filteredProjects = (categoryParam) ? data.projects?.filter(project => project.categories?.some(isCurrentCategory)) : data.projects;

    $: fuse = new Fuse(filteredProjects as readonly ExpandedProject[], {
        keys: ['title', 'categories.title'],
        threshold: 0.5,
    })
    let searchTerm = $page.url.searchParams.get('search');

    $: searchedProjects = (searchTerm) 
        ? fuse.search(searchTerm).map(result => result.item)
        : filteredProjects;
</script>

<section class="max-w-5xl mx-auto mt-16 mb-12">
    <h1>Projects</h1>
    <p class="text-xl mt-4">Here are some of the projects I've worked on.</p>
    <div class="controls">
        <div class="categories-wrapper">
            <p>Filter by category:</p>
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
</section>
<section class="project-grid">
    {#each searchedProjects || [] as project}
        <ProjectCard {project} />
    {/each}
</section>

<style lang="postcss">
    small {
        @apply font-normal text-sm;
        vertical-align: middle;
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
        justify-content: space-between;
        align-items: center;
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
        justify-content: center;
    }

    .categories li {
        margin-inline: 1rem;
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
    
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
        
    }
</style>