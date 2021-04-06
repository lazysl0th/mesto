export default class Card {
  constructor (card, templateSelector, showElement) {
    this._elementImageSrc = card.link;
    this._elementImageAlt = card.name;
    this._elementText = card.name;
    this._templateSelector = templateSelector;
    this._showElement = showElement;
    this._newElement = this._getElement();
    this._elementImage = this._newElement.querySelector('.element__image');
    this._buttonLike = this._newElement.querySelector('.element__button-like');
    this._buttonDelete = this._newElement.querySelector('.element__button-delete');
  }

  _deleteElement(){
    this._buttonDelete.closest('.element').remove();
  }

  _likeElement(){
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  _addEventListener(){
    this._buttonDelete.addEventListener('click', () => {
      this._deleteElement();
    });

    this._buttonLike.addEventListener('click', () => {
      this._likeElement();
    });

    this._elementImage.addEventListener('click', () => {
      this._showElement(this._elementImageAlt, this._elementImageSrc);
    });
  }

  _getElement() {
    const element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  generateElement() {
    this._addEventListener();
    this._elementImage.src = this._elementImageSrc;
    this._elementImage.alt = this._elementImageAlt;
    this._newElement.querySelector('.element__text').textContent = this._elementText;
    return this._newElement;
  }
}
