<script>
	import Cta from "$lib/components/Cta.svelte";

</script>
<section>
    <h1>Thank you for contacting us</h1>
    <p>We will get back to you as soon as possible.</p>
    <Cta href="/projects">Browse our work</Cta>
</section>

<style lang="postcss">
    section {
        @apply max-w-5xl mx-auto h-screen flex flex-col justify-center items-center;
    }

    h1 {
        @apply text-5xl;
    }

    p {
        @apply my-8;
    }
</style>