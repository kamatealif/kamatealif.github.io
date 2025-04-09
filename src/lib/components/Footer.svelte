<script>
	let links = [
		{
			name: 'LinkedIn',
			link: 'https://www.linkedin.com/in/alip-kamate-722917261/',
			icon: 'https://img.icons8.com/ios-glyphs/30/ffffff/linkedin.png'
		},
		{
			name: 'GitHub',
			link: 'https://github.com/kamatealif',
			icon: 'https://img.icons8.com/ios-glyphs/30/ffffff/github.png'
		},
		{
			name: 'Instagram',
			link: 'https://www.instagram.com/_justt.alif/',
			icon: 'https://img.icons8.com/ios-glyphs/30/ffffff/instagram-new.png'
		}
	];
</script>

<footer>
	<h2>Connect with me</h2>
	<p>Feel free to reach out on any of these platforms!</p>
	<p>&copy;{new Date().getFullYear()} Alif kamate All rights reserved.</p>
	<div class="links">
		{#each links as link}
			<a href={link.link} target="_blank" rel="noopener noreferrer">
				<img src={link.icon} alt={link.name} />
			</a>
		{/each}
	</div>
</footer>

<style>
	footer {
		margin-top: 2rem;
		padding: 2rem 0;
		gap: 1rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.05); /* Semi-transparent white */
		backdrop-filter: blur(10px); /* Blur effect */
		-webkit-backdrop-filter: blur(10px); /* Safari support */
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
		border: 1px solid rgba(255, 255, 255, 0.2); /* Border for glass effect */
	}
	.links {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
	a {
		text-decoration: none;
	}
	img {
		width: 30px;
		height: 30px;
	}
	a:hover img {
		transform: scale(1.1);
		transition: transform 0.3s ease;
	}
	@media (max-width: 768px) {
		.links {
			flex-direction: row;
			gap: 0.5rem;
		}
		img {
			width: 25px;
			height: 25px;
		}
		a:hover img {
			transform: scale(1.05);
		}
	}
</style>
