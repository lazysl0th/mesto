export default class Card {
  constructor ( {data, handleCardClick, handleCardDelete }, templateSelector) {
    this._elementImageSrc = data.link;
    this._elementImageAlt = data.name;
    this._elementText = data.name;
    this._likeNumber = (data.likes.length > 0) ? data.likes.length : '';
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick  = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._newElement = this._getElement();
    this._elementImage = this._newElement.querySelector('.element__image');
    this._buttonLike = this._newElement.querySelector('.element__button-like');
    this._buttonDelete = this._newElement.querySelector('.element__button-delete');
    this._owner = data.owner._id;
  }

  _showButtonDelete() {
    if (this._owner !== '42c1c6f05889e0147598296e') {
      this._buttonDelete.classList.add('element__button-delete_invisible');
    }
  }

  _deleteElement(){
    this._handleCardDelete(this._cardId, this._buttonDelete);
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
      this._handleCardClick(this._elementImageAlt, this._elementImageSrc);
    });
  }

  _getElement() {
    const element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return element;
  }

  generateElement() {
    this._addEventListener();
    this._showButtonDelete();
    this._elementImage.src = this._elementImageSrc;
    this._elementImage.alt = this._elementImageAlt;
    this._newElement.querySelector('.element__text').textContent = this._elementText;
    this._newElement.querySelector('.element__like-number').textContent = this._likeNumber;
    return this._newElement;
  }
}
