<script>
	const rows = 25;
	const cols = 50;
	const grid = Array.from({ length: rows * cols }, (_, i) => i);
</script>

<div class="pattern-container">
	{#each grid as i}
		<div class="dot" style="animation-delay: {(i % 10) * 0.15}s"></div>
	{/each}
</div>

<style>
	.pattern-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(16px, 1fr));
		grid-auto-rows: 16px;
		z-index: -2;
		opacity: 0.07;
		pointer-events: none;
	}

	.dot {
		width: 6px;
		height: 6px;
		margin: auto;
		border-radius: 50%;
		background: #00ff88;
		animation: pulse 3s infinite ease-in-out;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.4;
		}
		50% {
			transform: scale(1.6);
			opacity: 1;
		}
	}
</style>
