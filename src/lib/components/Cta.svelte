<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
    export let portableText: CustomBlockComponentProps<Schema.Cta> | undefined = undefined
    export let href: string = ''
</script>

<a href={portableText?.value.url || href}>
    {#if portableText}
    {portableText.value.text}
    {:else}
    <slot />
    {/if}
    <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.64746" cy="9.36096" r="9" fill="hsla(328, 82%, 30%, 0.3)" fill-opacity="0.3"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.64153 5.03508C8.03205 4.64456 8.66522 4.64456 9.05574 5.03508L13.3754 9.35471L9.05574 13.6743C8.66522 14.0649 8.03205 14.0649 7.64153 13.6743C7.251 13.2838 7.251 12.6506 7.64153 12.2601L10.5469 9.35471L7.64153 6.44929C7.251 6.05877 7.251 5.4256 7.64153 5.03508Z" fill="hsla(335, 96%, 60%, 1)"/>
    </svg>
</a>

<style lang="postcss">
    a {
        background: hsla(315, 82%, 30%, 0.3);
        color: hsla(338, 94%, 79%, 1);
        display: flex;
        width: fit-content;
        align-items: center;
        @apply gap-3;
        @apply rounded-full;
        @apply my-8 pl-4 py-2;
    }

    a:hover,
    a:focus {
        background: hsla(315, 82%, 45%, 0.3);
        color: hsla(338, 97%, 85%, 1);
    }

    a:last-child {
        margin-bottom: 0;
    }

    a:first-child {
        margin-top: 0;
    }

    a:after {
        content: '';
    }

    svg {
        display: inline-block;
        --size: 19px;
        width: var(--size);
        height: var(--size);
    }
</style>

