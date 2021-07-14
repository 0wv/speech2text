<script>
    import { flip } from 'svelte/animate'
    import { fly } from 'svelte/transition'
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
                id: (new Date()).getTime(),
                text,
                timeline: (new Date()).toLocaleTimeString()
            })
			datalist = datalist
		}
	}
</script>

<div>
    <button
        class="border-2 border-lime-500 dark:text-lime-300 px-4 py-2 rounded-2xl text-lime-900 w-full"
        {disabled}
        on:click={() => {
            speech.start()
            disabled = true
        }}
    ><pre><code>speech.start()</code></pre></button>
</div>
{#each datalist as data, i (data.id)}
    <div
        animate:flip={{ duration: 100 }}
        class="border-2 border-lime-500 flex flex-wrap gap-2 my-2 p-2 rounded-2xl sm:border-0 sm:flex-nowrap sm:p-0 sm:rounded-none"
        in:fly={{ duration: 100, x: -200 }}
    >
        <div class="border-2 border-lime-500 flex flex-col flex-initial justify-center px-4 py-2 rounded-2xl">
            <div class="dark:text-lime-300 font-bold text-lime-900">{data.timeline}</div>
        </div>
        <div class="flex-auto sm:flex-1">
            <textarea
                bind:this={textareas[i]}
                class="border-2 border-lime-500 dark:bg-gray-900 dark:text-lime-300 h-full px-4 py-2 rounded-2xl text-lime-900 w-full"
                rows="5"
            >{data.text}</textarea>
        </div>
        <div class="flex-initial">
            <button
                class="border-2 border-rose-500 dark:text-rose-300 h-full px-4 py-2 rounded-2xl text-rose-900 w-full"
                on:click={() => {
                    datalist.splice(i, 1)
                    datalist = datalist
                }}
            >削除</button>
        </div>
        <div class="flex-auto sm:flex-initial">
            <button
                class="border-2 border-sky-500 dark:text-sky-300 h-full px-4 py-2 rounded-2xl text-sky-900 w-full"
                on:click={() => {
                    const data = textareas[i].value
                    navigator.clipboard.writeText(data)
                }}
            >コピー</button>
        </div>
    </div>
{/each}