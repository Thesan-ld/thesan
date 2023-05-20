<section>
    <div class="glass">
        <h2>Make your event shine</h2>
        <p>Reach out today to get a quote on our lighting design services.</p>
        <a href="/contact-us">Contact us</a>    
    </div>
    <div class="img-wrapper">
        <img src="/contact.jpg" alt="Contact us" />
    </div>
</section>

<style lang="postcss">
    section {
        display: grid;
        grid-template-columns: 3fr 2fr;
        align-items: center;
        @apply max-w-7xl mx-auto mt-48 mb-12;
    }

    .glass {
        @apply bg-slate-950/50 py-5 px-24 my-8 rounded-lg shadow-lg;
        backdrop-filter: blur(10px);
    }

    h2 {
        @apply text-5xl;
    }

    p {
        @apply my-8;
    }

    a {
        display: block;
        @apply mt-4 py-2 px-4 rounded;
        @apply text-xl;
        color: #FCC695;
        background: #272321;
        text-align: center;
    }

    a:hover, a:focus {
        background: #2a1f1a;
        color: #FB9937;
    }

    .img-wrapper {
        margin-inline-start: -250px;
        z-index: -1;
        @apply relative rounded-lg overflow-hidden h-full;
        @apply grid place-items-center;
    }

    .img-wrapper::after {
        content: '';
        @apply absolute inset-0 w-full h-full;
        background: radial-gradient(57.12% 118.95% at 38.04% -12.63%, rgba(0, 0, 0, 0.225) 0%, rgba(0, 0, 0, 0.75) 100%);
    }

    img {
        @apply absolute inset-0 w-full h-full object-cover;
        filter: brightness(1.2) saturation(.5);
    }
</style>