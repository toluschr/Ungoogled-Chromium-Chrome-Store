(function main () {
	var baseUrl = "https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=%VERSION&x=id%3D%ID%26installsource%3Dondemand%26uc";
	const iText = "Install";

	(function waitForInject () {
		let pluginSection = document.querySelector(".h-F-f-k.F-f-k");
		if (pluginSection != null) {
			addSectionListener(pluginSection);
			return;
		}
		setTimeout(() => { waitForInject(); }, 100);
	})();

	function addSectionListener (section) {
		section.addEventListener("DOMNodeInserted", (event) => {
			if (event.relatedNode != section) return;

			setTimeout(() => { 
				InstallButton_Add(event.target);
			}, 10);
		});
	}

	function InstallButton_Add (pluginMainPage) {
		/* Check if the correct Element was added */
		let buttonWrapper = pluginMainPage.querySelector(".h-e-f-Ra-c.e-f-oh-Md-zb-k");
		if (buttonWrapper == null) return;
		
		/* Adding the button */
		let installButton = '<div role="button" class="dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c" aria-label="' + iText + '" tabindex="0" style="user-select: none;"><div class="g-c-Hf"><div class="g-c-x"><div class="g-c-R  webstore-test-button-label">' + iText + '</div></div></div></div>';
		buttonWrapper.innerHTML += installButton;
		installButton = buttonWrapper.children[0];
		
		/* Styling the button */
		installButton.addEventListener("mouseover", () => {
			installButton.className = "dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-0c-td-jb-oa g-c g-c-l";
		});
		
		installButton.addEventListener("mouseout", () => {
			installButton.className = "dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c";
		});
		
		installButton.addEventListener("mousedown", () => {
			installButton.className = "dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c g-c-Xc g-c-Sc-ci g-c-l g-c-Bd";
		});
		
		installButton.addEventListener("mouseup", () => {
			installButton.className = "dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-0c-td-jb-oa g-c g-c-l";
		});
		
		/* Code for onclick */
		installButton.addEventListener("click", () => {
			let version = navigator.userAgent.match(/(?<=Chrom(e|ium)\/)\d+\.\d+/)[0];
			let id = document.URL.match(/(?<=\/)(\w+)\?hl=.*/)[1];
			window.location = baseUrl.replace("%VERSION", version).replace("%ID", id);
		});
	}
})();
