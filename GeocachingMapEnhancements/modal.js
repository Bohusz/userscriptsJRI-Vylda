(function () {
	let dom = {
		modal: document.createElement("div"),
		body: document.createElement("div"),
		title: document.createElement("div")
	}
	let isOpened = false;
	dom.modal.id = "vylda-modal";
	dom.body.id = "vylda-modal-body";
	dom.title.id = "vylda-modal-title";

	window.addEventListener("keyup", e => {
		if (e.key == "Escape" && isOpened) {
			closeModal();
		}
	})

	window.addEventListener("load", () => {
		startModal();
	});

	function startModal() {
		let anchors = document.querySelectorAll("a.modal");
		Array.from(anchors).forEach(a => {
			a.addEventListener("click", (e) => {
				e.preventDefault();
				showModal(e.target);
			})
		});
	}

	function showModal(target) {
		if (isOpened) return;
		let a = target.closest("a");
		dom.title.textContent = "";

		if (!document.querySelector("#vylda-modal")) {
			dom.body.appendChild(dom.title);
			dom.modal.appendChild(dom.body);
			document.body.appendChild(dom.modal);

			dom.modal.addEventListener("click", e => {
				closeModal();
			}, false);
		}

		let oldImg = dom.body.querySelector("img");
		if (oldImg) {
			dom.body.removeChild(oldImg);
		}

		if (a.href) {
			loadImage(a.href).then(img => {
				dom.body.appendChild(img);
				dom.modal.classList.add("opened");
			}).catch(error => console.error(error));

			if (a.title) {
				dom.title.textContent = a.title;
			}

			isOpened = true;
		}

	}

	function closeModal() {
		dom.modal.classList.remove("opened");
		isOpened = false;
	}

	function loadImage(url) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.addEventListener('load', e => resolve(img));
			img.addEventListener('error', () => {
				reject(new Error(`Failed to load image's URL: ${url}`));
			});
			img.src = url;
		});
	}
}())