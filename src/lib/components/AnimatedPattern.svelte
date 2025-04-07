<script>
	let x = 0;
	let y = 0;

	// Update the position of the ball based on mouse movement
	function handleMouseMove(event) {
		x = event.clientX - window.innerWidth / 2; // Calculate offset from center
		y = event.clientY - window.innerHeight / 2; // Calculate offset from center
	}
</script>

<div
	class="cursor-ball"
	style="transform: translate(calc(-50% + {x / 20}px), calc(-50% + {y / 20}px));"
></div>

<!-- Attach mousemove event to the document -->
<svelte:window on:mousemove={handleMouseMove} />

<style>
	/* Fullscreen container to track mouse movement */
	:global(body) {
		margin: 0;
		/* overflow: hidden; */
	}

	.cursor-ball {
		width: 600px;
		height: 600px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(circle at center, #00ff88 10%, #004422 80%);
		filter: blur(80px);
		opacity: 0.1;
		z-index: -1;
		transition: transform 0.2s ease-out;
		will-change: transform;
	}
</style>
