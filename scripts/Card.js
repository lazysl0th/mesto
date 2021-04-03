 import  { element, popupFigure, popupFigureImage, popupFigcap } from './utils.js';
 export default class Card {
  constructor (card) {
    this._elementImageSrc = card.link;
    this._elementImageAlt = card.name;
    this._elementText = card.name;
  }

  _showElement(){
    popupFigureImage.src = this._elementImageSrc;
    popupFigureImage.alt = this._elementImageAlt;
    popupFigcap.textContent = this._elementText;
    showPopup(popupFigure);
  }

  _deleteElement(){
    this._element.querySelector('.element__button-delete').closest('.element').remove();
  }

  _likeElement(){
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _addEventListener(){
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeElement();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._showElement();
    });
  }

  _getTemplateElement() {
    const newElement = element.cloneNode(true);
    return newElement;
  }

  generateElement() {
    this._element = this._getTemplateElement();
    this._addEventListener();
    this._element.querySelector('.element__image').src = this._elementImageSrc;
    this._element.querySelector('.element__image').alt = this._elementImageAlt;
    this._element.querySelector('.element__text').textContent = this._elementText;
    return this._element;
  }
}
