<script lang="ts">
	import { page } from '$app/stores';
    import type * as Schema from '$lib/sanitySchema'
    export let logo: string;
    export let companyName: string = '';
    export let navLinks: Schema.NavigationItem[] = [];

    $: isCurrentPage = (url: string | undefined) => url && $page.url.pathname.includes(url)
</script>

<header>
    <a href="/" class="logotype">
        <img src={logo} alt={companyName} />
    </a>
    <nav>
        {#each navLinks as link}
        <a href={link.url} class={
            (link.isCallToAction ? 'cta ' : ' ') +
            (isCurrentPage(link.url) ? 'active' : '')
        }>
            {link.title}
        </a>
        {/each}
    </nav>
</header>

<style lang="postcss">
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-block: 1rem;
        padding-inline: 3rem;
        box-shadow: 0 0 5px hsla(0, 0%, 90%, 0.1);
        position: sticky;
        top: 0;
        z-index: 100;
        @apply bg-neutral-950/80 backdrop-filter backdrop-blur-sm;
    }

    nav {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .logotype img {
        width: 70px;
    }

    a {
        text-decoration: none;
        color: inherit;
        display: block;
        @apply text-gray-400 hover:text-gray-300 focus:text-gray-300;
    }

    a.active {
        @apply text-white;
    }

    a.cta {
        @apply bg-gradient-to-b from-gray-500 to-slate-600;
        @apply hover:from-white focus:from-white hover:to-white focus:to-white;
        @apply text-white hover:text-gray-500 focus:text-gray-500;
        border: solid 1px;
        @apply border-gray-500;
        @apply px-4 py-1;
        border-radius: 0.25rem;
    }
</style>