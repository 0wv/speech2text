<script>
    let disabled = false
	const speech = new webkitSpeechRecognition()
    let textareas = []
	let datalist = []
	speech.lang = 'ja_JP'
	speech.onend = () => {
		speech.start()
	}
	speech.onresult = e => {
		speech.stop()
		if (e.results[0].isFinal) {
			const text = e.results[0][0].transcript
			datalist.unshift({
                text,
                timeline: (new Date()).toLocaleTimeString()
            })
			datalist = datalist
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
{#each datalist as data, i}
    <div class="flex gap-2 my-2">
        <div class="border flex flex-col flex-initial justify-center px-4 py-2">
            <div>{data.timeline}</div>
        </div>
        <div class="flex-1">
            <textarea
                bind:this={textareas[i]}
                class="h-full px-4 py-2 w-full"
                rows="5"
            >{data.text}</textarea>
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