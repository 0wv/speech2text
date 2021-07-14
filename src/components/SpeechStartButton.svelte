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

<div>
    <button
        class="px-4 py-2 w-full"
        {disabled}
        on:click={() => {
            speech.start()
            disabled = true
        }}
    ><pre><code>speech.start()</code></pre></button>
</div>
{#each texts as text, i}
    <div class="flex">
        <div class="flex-1">
            <textarea
                bind:this={textareas[i]}
                class="h-full w-full"
                cols="30"
                rows="10"
            >{text}</textarea>
        </div>
        <div class="flex-initial">
            <button
                class="h-full px-4 py-2 w-full"
                on:click={() => {
                    const data = textareas[i].value
                    navigator.clipboard.writeText(data)
                }}
            >コピー</button>
        </div>
    </div>
{/each}