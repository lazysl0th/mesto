export default class Card {
  constructor ( {data, handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike }, templateSelector, userId) {
    this._elementImageSrc = data.link;
    this._elementImageAlt = data.name;
    this._elementText = data.name;
    this._likes = data.likes;
    this._likeNumber = (data.likes.length > 0) ? data.likes.length : '';
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick  = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike
    this._newElement = this._getElement();
    this._elementImage = this._newElement.querySelector('.element__image');
    this._buttonLike = this._newElement.querySelector('.element__button-like');
    this._buttonDelete = this._newElement.querySelector('.element__button-delete');
    this._owner = data.owner._id;
    this._userId = userId;
    this._usersId = this._likes.map ((item) => item._id);
  }

  _installLike() {
    this._handleAddLike(this._cardId)
      .then((result) => {
        this._newElement.querySelector('.element__like-number').textContent = result.likes.length;
        this._usersId = result.likes.map ((item) => item._id);
      })
      .catch((error) => (console.log(error)));
  }

  _removeLike() {
    this._handleDeleteLike(this._cardId)
      .then((result) => {
        this._newElement.querySelector('.element__like-number').textContent = (result.likes.length > 0) ? result.likes.length : '';
        this._usersId = result.likes.map ((item) => item._id);
      })
      .catch((error) => (console.log(error)));

  }

  _showButtonDelete() {
    if (this._owner !== this._userId) {
      this._buttonDelete.classList.add('element__button-delete_invisible');
    }
  }

  _showLikeElement() {
    if (this._usersId.includes(this._userId)) {
      this._buttonLike.classList.add('element__button-like_active')
    }
  }

  _likeElement(){
    if (this._usersId.includes(this._userId)) {
      this._removeLike()
      this._buttonLike.classList.remove('element__button-like_active');
    } else {
      this._installLike();
      this._buttonLike.classList.add('element__button-like_active');
    }
  }

  _addEventListener(){
    if (this._owner === this._userId) {
      this._buttonDelete.addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this._buttonDelete);
      });
    }

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
    this._showLikeElement();
    this._elementImage.src = this._elementImageSrc;
    this._elementImage.alt = this._elementImageAlt;
    this._newElement.querySelector('.element__text').textContent = this._elementText;
    this._newElement.querySelector('.element__like-number').textContent = this._likeNumber;
    return this._newElement;
  }
}
