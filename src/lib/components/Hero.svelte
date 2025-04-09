<script>
	import Typewriter from 'typewriter-effect/dist/core';
	import { onMount } from 'svelte';

	let typewriterElement = $state(null);

	onMount(() => {
		const typewriter = new Typewriter(typewriterElement, {
			strings: [
				'A Data Scientist',
				'A Software Engineer',
				'A Web Developer',
				'A Farmer',
				'An AI Enthusiast'
			],
			autoStart: true,
			loop: true
		});
	});
</script>

<section>
	<h1>Hey, I am <br /><span bind:this={typewriterElement}></span></h1>
	<p>I build data-driven apps & beautiful UIs with Python, JS & AI ✨</p>
</section>

<style>
	@font-face {
		font-family: 'Geist Mono', monospace;
		src: url(/font/GeistMono-Regular.ttf) format('truetype');
		font-weight: normal;
	}
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		margin-top: -5rem;
		z-index: 1;
		position: relative;
	}
	h1 {
		position: relative;
		font-size: 2.5rem;
		font-weight: 700;
		color: #fff;
	}
	h1 span {
		font-family: 'Geist Mono', monospace;
	}

	h1 span {
		color: #00ff88;
	}
	p {
		font-size: 1.2rem;
		color: #ccc;
	}
	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}
		h1 span {
			font-size: 1.5rem;
		}
		p {
			font-size: 1rem;
		}
	}
</style>
