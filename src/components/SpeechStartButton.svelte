<script>
    let disabled = false
	const speech = new webkitSpeechRecognition()
    let textareas = []
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
{#each texts as text, i}
    <textarea
        bind:this={textareas[i]}
        cols="30"
        rows="10"
    >{text}</textarea>
    <button
        class="px-4 py-2"
        on:click={() => {
            const data = textareas[i].value
            navigator.clipboard.writeText(data)
        }}
    >コピー</button>
{/each}