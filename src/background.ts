// Note: Synchronous XMLHttpRequest on the main thread is deprecated.
// https://xhr.spec.whatwg.org/
async function request(url: string, reg: RegExp): Promise<string[]> {
	const res = await fetch(url).then(async (body) => {
		return (await body.text()).match(reg)
	})

	if (res === null) {
		return []
	}

	return [...res]
}

async function getImageUrls(pageURL: string): Promise<string[]> {
	let urls = []
	const match =
		/https:\/\/images\d*\.alphacoders\.com\/\d+\/thumb-\d+-\d+\.\w+/g
	for (const url of await request(pageURL, match)) {
		urls.push(url.replace(/thumb-\d+-/g, ""))
	}
	return urls
}

async function downloadAll(baseurl: string): Promise<void> {
	let urls = []
	const match = /Last Page \((\d+)\)/
	const last = Number((await request(baseurl, match))[1])
	for (let p = 1; p <= last; p++) {
		const pageURl = baseurl + "&page=" + p
		for (let url of await getImageUrls(pageURl)) {
			urls.push(url)
		}
	}
	console.info(urls)
	for (let url of urls) {
		console.log(url)
		chrome.downloads.download({ url: url })
	}
}

chrome.runtime.onMessage.addListener((m) => {
	const baseurl = m.url.replace(/&page=\d+/, "")
	downloadAll(baseurl)
})
