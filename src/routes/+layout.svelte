<script lang="ts">
    import type * as Schema from '$lib/sanitySchema'
    import Nav from "$lib/components/Nav.svelte";
    import '../app.css'
	import Footer from '$lib/components/Footer.svelte';

    type SettingsWithUrl = Schema.SiteSettings & { logoUrl: string };

    export let data: { 
        siteSettings: SettingsWithUrl
        timestamp: Date
    };
</script>

<Nav
    logo={data.siteSettings?.logoUrl}
    companyName={data.siteSettings.companyName}
    navLinks={data.siteSettings.navigation}
/>
<main>
    <slot></slot>
</main>
<Footer data={{
    companyName: data.siteSettings.companyName,
    socialMedia: data.siteSettings.socialMedia,
    footerNavigation: data.siteSettings.footerNavigation,
    footerText: data.siteSettings.footerText,
    timestamp: data.timestamp,
}} />


<style>
    main {
        min-block-size: 100vh;
        max-inline-size: 1920px;
        margin-inline: auto;
        box-sizing: border-box;
    }
</style>