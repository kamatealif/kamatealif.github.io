<script>
	import AnimatedPattern from '../lib/components/AnimatedPattern.svelte';
	import Header from '../lib/components/Header.svelte';
	import Hero from '../lib/components/Hero.svelte';
	import About from '../lib/components/About.svelte';
	import Projects from '../lib/components/Projects.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<AnimatedPattern />

<Header />
<main>
	<Hero />
	<About />
	<Projects />
</main>
<Footer />

<style>
	main {
		max-width: 760px;
		margin: 0 auto;
		padding: 2rem;
		overflow-y: auto;
	}
	:global(body) {
		font-family: 'Roboto', sans-serif;
	}
</style>
