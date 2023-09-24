<section>
    <div class="glass">
        <h2>Make your event shine</h2>
        <p>Reach out today to get a quote on our lighting design services.</p>
        <a href="/contact">
            Contact us
            <svg viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.64746" cy="9.36096" r="9" fill="#8D490E" fill-opacity="0.3"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.64153 5.03508C8.03205 4.64456 8.66522 4.64456 9.05574 5.03508L13.3754 9.35471L9.05574 13.6743C8.66522 14.0649 8.03205 14.0649 7.64153 13.6743C7.251 13.2838 7.251 12.6506 7.64153 12.2601L10.5469 9.35471L7.64153 6.44929C7.251 6.05877 7.251 5.4256 7.64153 5.03508Z" fill="#FB9937"/>
            </svg>
        </a>    
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
        @apply bg-slate-950/50 p-4 sm:py-5 sm:px-24 my-8 rounded-lg shadow-lg;
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

    svg {
        display: inline-block;
        --size: 19px;
        width: var(--size);
        height: var(--size);
    }

    .img-wrapper {
        @apply -ml-48 sm:-ml-32 md:-ml-64;
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

    @media (max-width: 450px) {
        section {
            grid-template-columns: 1fr;
        }
    }
</style>