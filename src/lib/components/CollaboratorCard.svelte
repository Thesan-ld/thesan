<script lang="ts">
	import type { CollaboratorType } from "$lib/sanityQueries";

    export let person: CollaboratorType
    export let role: string
</script>

<svelte:element this={person.website ? 'a' : 'div'} class="person-card"
    href={person.website} target="_blank" rel="noopener noreferrer"
>
    <div>
        {#if person.image}
        <div class="img-wrap">
            <img src={person.image.url} alt={person.image.originalFilename} />
        </div>
        {/if}
        <div class="content-wrap">
            <h3>{person.name}</h3>
            <p>{role}</p>
        </div>
    </div>
</svelte:element>


<style lang="postcss">
    .person-card {
        position: relative;
        display: block;
        padding-inline-end: 24px;
        background: radial-gradient(96.21% 424.91% at 96.37% 100.01%, #FE7E43 0%, #FBE7BB 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
        @apply rounded;
    }

    .person-card:hover,
    .person-card:focus {
        background: #FBE7BB;
    }

    .person-card::before {
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

    .person-card::after {
        content: '';
        position: absolute;
        inset: 2px 24px 2px 2px;
        display: flex;
        gap: 10px;
        align-items: center;
        pointer-events: none;
        @apply bg-zinc-900 text-neutral-200 rounded;
    }

    .person-card > div {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px;
        z-index: 1;
    }

    .img-wrap {
        width: 60px;
        height: 60px;
        overflow: hidden;
        @apply rounded-sm;
    }

    .img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .content-wrap {
        padding-inline-start: 5px;
    }

    .content-wrap:first-child {
        padding-block: 5px;
    }

    h3 {
        @apply text-xl font-semibold;
    }

    p {
        @apply text-sm text-neutral-500;
    }
</style>
