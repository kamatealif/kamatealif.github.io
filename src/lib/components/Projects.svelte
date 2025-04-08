<script>
	let projects = [
		{
			title: 'Housing Price prediction',
			description:
				'In this Project, finding the house price by the age of the house, size of the house, and the area of the house',
			link: 'https://example.com/project1'
		},
		{
			title: 'Project 2',
			description: 'This is a description of project 2.',
			link: 'https://example.com/project2'
		},
		{
			title: 'Project 3',
			description: 'This is a description of project 3.',
			link: 'https://example.com/project3'
		}
	];
</script>

<div class="grid">
	{#each projects as project, i}
		<div class="item item-{i}">
			<h1>{project.title}</h1>
			<p>{project.description}</p>
			<a href={project.link}>{project.link}</a>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 8px;
	}
	.item {
		border-radius: 10px;

		background: rgba(255, 255, 255, 0.05); /* Semi-transparent white */
		backdrop-filter: blur(10px); /* Blur effect */
		-webkit-backdrop-filter: blur(10px); /* Safari support */
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 20px;
		margin-bottom: 20px;
		color: aliceblue;
	}
	.mobile-only {
		display: block;
	}
	.desktop-only {
		display: none;
	}

	.item-0 {
		grid-column: 1 / span 2;
		grid-row: 1 / span 2;
	}

	.item-1 {
		grid-column: 3;
		grid-row: 1;
	}

	.item-2 {
		grid-column: 3;
		grid-row: 2;
	}

	.item-3 {
		grid-column: 1;
		grid-row: 3;
	}

	.item-4 {
		grid-column: 2 / span 2;
		grid-row: 3;
	}
	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			gap: 8px;
		}
		.mobile-only {
			display: none;
		}
		.desktop-only {
			display: block;
		}

		.item-0 {
			grid-column: 1 / span 2;
			grid-row: 1 / span 2;
		}

		.item-1 {
			grid-column: 3;
			grid-row: 1;
		}

		.item-2 {
			grid-column: 3;
			grid-row: 2;
		}

		.item-3 {
			grid-column: 1;
			grid-row: 3;
		}

		.item-4 {
			grid-column: 2 / span 2;
			grid-row: 3;
		}
	}
	h1,
	p,
	a {
		margin-bottom: 10px;
		color: #00ff88;
		font-family: 'Geist Mono', monospace;
	}

	p {
		color: aliceblue;
	}
</style>
