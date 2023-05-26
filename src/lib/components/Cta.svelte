<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
    export let portableText: CustomBlockComponentProps<Schema.Cta>
</script>

<a href={portableText.value.url}>
    <span>
        {portableText.value.text}
    </span>
</a>

<style lang="postcss">
    a {
        position: relative;
        display: block;
        width: fit-content;
        padding-inline-end: 24px;
        background: radial-gradient(96.21% 424.91% at 96.37% 100.01%, #FE7E43 0%, #FBE7BB 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
        @apply my-8 text-slate-50 rounded;
    }

    a:hover,
    a:focus {
        background: #FBE7BB;
    }

    a::before {
        content: '';
        position: absolute;
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
        background: url('/up-right-arrow.svg') no-repeat;
        --size: 18px;
        width: var(--size);
        height: var(--size);
        pointer-events: none;
    }

    a::after {
        content: '';
        position: absolute;
        inset: 2px 24px 2px 2px;
        display: flex;
        gap: 10px;
        align-items: center;
        pointer-events: none;
        @apply bg-zinc-900 text-neutral-200 rounded;
    }

    a > span {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        @apply py-2 px-4;
        z-index: 1;
        @apply text-slate-50;
        
    }
</style>

