async function getImageUrls(): Promise<string[]> {
	const urls: string[] = []

	//TODO: handl autoload etc
	// this relies on autoload!
	const thumbContainers = Array.from(
		document.querySelectorAll(".thumb-container")
	)

	for (const element of thumbContainers) {
		const imageElement: HTMLImageElement | null =
			element.querySelector("img")
		if (imageElement === null) {
			continue
		}

		const sourceUrl: string = imageElement.src

		urls.push(sourceUrl)
	}

	return urls
}

async function sleep(ms: number): Promise<void> {
	return new Promise<void>((res) => setTimeout(res, ms))
}

async function downloadAll(sleepTime: number): Promise<void> {
	const urls = await getImageUrls()

	for (const url of urls) {
		console.log(url)
		chrome.downloads.download({ url: url })
		await sleep(sleepTime)
	}
}

chrome.runtime.onMessage.addListener((m) => {
	//TODO: make this a setting!
	const sleepTime = 1000

	downloadAll(sleepTime)
})
