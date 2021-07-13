<script>
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
</script>

<button
    class="px-4 py-2"
    {disabled}
    on:click={() => {
        speech.start()
        disabled = true
    }}
><pre><code>speech.start()</code></pre></button>
{#each texts as text}
    <textarea cols="30" rows="10">{text}</textarea>
{/each}