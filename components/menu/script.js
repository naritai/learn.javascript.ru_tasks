'use strict';

class Menu {
	constructor(options) {
		this.title = options.title;
		this.menuContainer = null;
	}

	_render() {
		const title = document.createElement('span');
		title.classList.add('title');
		title.textContent = this.title;

		const container = document.createElement('div');
		container.classList.add('menu');
		container.append(title);

		container.onmousedown = () => false;
		container.onclick = this._onMenuClick.bind(this);
		this.menuContainer = container;
	};

	_renderItems() {
		const items = options.items ?? []; // ?? returns first defined value (not null or undefined)
		const list = document.createElement('ul');

		items.forEach((item, idx, arr) => {
			const li = document.createElement('li');
			li.textContent = item;
			list.append(li);
		});
		this.menuContainer?.append?.(list);
	};

	_onMenuClick(event) {
		const closestTitle = event.target.closest('.title');

		if (closestTitle && this.menuContainer.contains(closestTitle)) {
			this.toggle();
		}
	}

	open() {
		if (!this.menuContainer?.querySelector?.('ul')) {
			this._renderItems();
		}
		this.menuContainer.classList.add('open');
	}

	close() {
		this.menuContainer.classList.remove('open');
	}

	toggle() {
		if (this.menuContainer.classList.contains('open')) {
			this.close();
		} else {
			this.open();
		}
	}

	getElement() {
		if (!this.menuContainer) {
			this._render();
		}
		return this.menuContainer;
	}
};

const options = {
  title: "Сладости",
  items: [
    "Торт",
    "Пончик",
    "Пирожное",
    "Шоколадка",
    "Мороженое"
  ]
};

const menu = new Menu(options).getElement();
document.body.append(menu);