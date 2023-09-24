<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
	import { PortableText } from '@portabletext/svelte';
    export let data: {
        footerNavigation: Schema.SiteSettings['footerNavigation'],
        socialMedia: Schema.SiteSettings['socialMedia'],
        footerText: Schema.SiteSettings['footerText'],
        timestamp: Date,
        companyName: Schema.SiteSettings['companyName'],
    }
</script>

<footer>
    <nav>
        {#each data.footerNavigation || [] as link (link._key)}
            <a href={link.url}>{link.title}</a>
        {/each}
    </nav>
    <nav>
        {#each data.socialMedia || [] as link (link._key)}
            <a href={link.url} rel="noopener noreferrer" target="_blank">{link.title}</a>
        {/each}
    </nav>
    <section>
        <p>© {data.timestamp.getFullYear()} {data.companyName}</p>
        <PortableText value={data.footerText} />
    </section>
</footer>

<style lang="postcss">
    footer {
        box-sizing: border-box;
        @apply max-w-5xl mx-auto;
        border-block-start: solid 1px;
        @apply border-gray-200;
        @apply mt-24;
    }

    footer nav {
        display: flex;
        justify-content: center;
        margin-block: 2rem;
    }

    footer nav a {
        text-decoration: none;
        color: inherit;
        font-size: 18px;
        @apply text-slate-600 hover:text-slate-500 focus:text-slate-500;
    }

    nav a:not(:last-child)::after {
        content: '·';
        margin-inline: 1rem;
    }

    footer section {
        display: flex;
        justify-content: space-between;
        @apply pb-8 px-4;
    }

</style>
