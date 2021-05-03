export default class Section {
  constructor( { renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach ((item) => {
      this._renderer(item)
    })
  }
}
