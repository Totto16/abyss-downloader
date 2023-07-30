const buttons = Array.from(document.querySelectorAll("button")).filter(
	(button) => button.innerText.includes("Auto Load")
)
if (buttons.length === 1) {
	const downloaderID = "abyss-downloader"
	if (document.getElementById(downloaderID) == null) {
		const newButton: HTMLAnchorElement = document.createElement("a")
		newButton.id = downloaderID
		newButton.classList.add(...["btn", "btn-success"])
		newButton.style.marginTop = "3px;"
		newButton.innerHTML = "Download All Wallpapers"

		newButton.addEventListener("click", () => {
			chrome.runtime.sendMessage({ url: document.location.href })
		})

		buttons[0]?.parentElement?.append(newButton)
	}
} else {
	console.info("No Suitable space for download all button found")
}
