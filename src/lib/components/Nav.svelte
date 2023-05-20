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
            {#if link.isCallToAction}
            <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.64746" cy="9.36096" r="9" fill="#8D490E" fill-opacity="0.3"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.64153 5.03508C8.03205 4.64456 8.66522 4.64456 9.05574 5.03508L13.3754 9.35471L9.05574 13.6743C8.66522 14.0649 8.03205 14.0649 7.64153 13.6743C7.251 13.2838 7.251 12.6506 7.64153 12.2601L10.5469 9.35471L7.64153 6.44929C7.251 6.05877 7.251 5.4256 7.64153 5.03508Z" fill="#FB9937"/>
            </svg>
            {/if}                
        </a>
        {/each}
    </nav>
</header>

<style lang="postcss">
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        margin-inline: 20px;
        @apply rounded-full;
        position: fixed;
        inset: 20px 20px auto;
        top: 20px;
        z-index: 100;
        border: solid 1px;
        @apply bg-neutral-950/40 border-neutral-950/20;
        @apply backdrop-filter backdrop-blur;
    }

    nav {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .logotype img {
        width: 60px;
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
        background: #272321;
        color: #FCC695;
        display: flex;
        align-items: center;
        @apply gap-3;
        @apply rounded-full;
        @apply px-5 py-2;
    }

    a.cta:hover,
    a.cta:focus {
        background: #2a1f1a;
        color: #FB9937;
    }

    svg {
        display: inline-block;
        --size: 19px;
        width: var(--size);
        height: var(--size);
    }
</style>