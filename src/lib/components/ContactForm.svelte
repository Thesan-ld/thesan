<script lang="ts">
	import type { WithSanityKey } from '$lib/sanity';
    import type * as Schema from '$lib/sanitySchema'
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
    export let data: WithSanityKey<Schema.ContactForm>;
    export let portableText: CustomBlockComponentProps<Schema.ContactForm> = {} as any
</script>

<section>
    <PortableText value={data?.preFormContent || portableText.value?.preFormContent}/>
    <form>
        <label for="name">Name
            <input type="text" id="name" name="name" placeholder="Your name" required>
        </label>
        <label for="email">Email
            <input type="email" id="email" name="email" placeholder="Your email" required>
        </label>
        <label for="subject">Subject
            <input type="text" id="subject" name="subject" placeholder="Subject" required>
        </label>
        <label for="message">Message
            <textarea id="message" name="message" placeholder="Your message" required></textarea>
        </label>
        <button type="submit">Submit</button>
    </form>
</section>

<style>
    section {
        @apply max-w-5xl mx-auto mb-24;
        @apply bg-zinc-900 rounded-lg py-5 px-10;
    }
    label {
        display: grid;
        gap: 10px;
        grid-template-columns: 120px 1fr;
        margin-bottom: 1rem;
    }

    input, textarea {
        @apply border border-zinc-500 rounded-lg p-2;
        @apply text-base;
    }

    button[type="submit"] {
        display: block;
        width: 100%;
        @apply mt-4 py-2 px-4 rounded;
        @apply text-xl;
        color: #FCC695;
        background: #272321;
        text-align: center;
    }

    button:hover, button:focus {
        background: #2a1f1a;
        color: #FB9937;
    }
</style>