<script>
	import Tailwind from './components/Tailwind.svelte'
	let disabled = false
	const speech = new webkitSpeechRecognition()
	let texts = []
	speech.lang = 'ja_JP'
	speech.onend = () => {
		speech.start()
	}
	speech.onresult = e => {
		speech.stop()
		if (e.results[0].isFinal) {
			const text = e.results[0][0].transcript
			texts.push(text)
			texts = texts
		}
	}
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<button
		class="px-4 py-2"
		{disabled}
		on:click={() => {
			speech.start()
			disabled = true
		}}
	><pre><code>speech.start()</code></pre></button>
	{#each texts as text}
		<div>{text}</div>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Tailwind />