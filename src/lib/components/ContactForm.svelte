<script lang="ts">
	import type { WithSanityKey } from '$lib/sanity';
    import type * as Schema from '$lib/sanitySchema'
	import { PortableText, type CustomBlockComponentProps } from '@portabletext/svelte';
    export let data: WithSanityKey<Schema.ContactForm>;
    export let portableText: CustomBlockComponentProps<Schema.ContactForm> = {} as any

    // function handleSubmit(event: SubmitEvent) {
    //     event.preventDefault();
    //     const form = event.currentTarget as HTMLFormElement
    //     const data = new FormData();
    //     fetch(form.action, {
    //         method: form.method,
    //         // @ts-ignore because I know this FormData has no File objects
    //         // and can therefore be converted to a URLSearchParams
    //         body: new URLSearchParams(data).toString(),
    //         headers: {
    //             'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         }
    //     }).then(() => {
    //         alert('Thank you for your message! We will get back to you as soon as possible.');
    //     }).catch((error) =>
    //         alert(error)
    //     );
    // }
</script>

<section>
    <PortableText value={data?.preFormContent || portableText.value?.preFormContent}/>
    <form name="contact" method="POST" data-netlify="true">
        <label for="name">Name
            <input type="text" id="name" name="name"
                placeholder="Someone Neat" required
            >
        </label>
        <label for="email">Email
            <input type="email" id="email" name="email"
                placeholder="someone.neat@company.com" required
            >
        </label>
        <label for="subject">Subject
            <input type="text" id="subject" name="subject"
                placeholder="I need lighting design!" required
            >
        </label>
        <label for="message">Message
            <textarea id="message" name="message"
                placeholder="Please include your venue, timeline, budget, and any other details you have available."
            required></textarea>
        </label>
        <input type="hidden" name="form-name" value="contact" />
        <button type="submit">
            Submit
            <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.64746" cy="9.36096" r="9" fill="#8D490E" fill-opacity="0.3"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.64153 5.03508C8.03205 4.64456 8.66522 4.64456 9.05574 5.03508L13.3754 9.35471L9.05574 13.6743C8.66522 14.0649 8.03205 14.0649 7.64153 13.6743C7.251 13.2838 7.251 12.6506 7.64153 12.2601L10.5469 9.35471L7.64153 6.44929C7.251 6.05877 7.251 5.4256 7.64153 5.03508Z" fill="#FB9937"/>
            </svg>
        </button>
    </form>
</section>

<style lang="postcss">
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
        @apply border border-zinc-500 rounded p-2;
        @apply text-base;
    }

    input::placeholder, textarea::placeholder {
        @apply text-zinc-500;
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

    svg {
        display: inline-block;
        --size: 19px;
        width: var(--size);
        height: var(--size);
    }
</style>