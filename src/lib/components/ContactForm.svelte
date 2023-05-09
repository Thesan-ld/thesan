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
        <button type="submit">Send</button>
    </form>
</section>

<style>
    label {
        display: block;
        margin-bottom: 1rem;
    }
</style>