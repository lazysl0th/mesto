import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }, user) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._userInfo = user;
    this._form = this._popup.querySelector('.popup__content_type_form');
    this._formInputs = this._form.querySelectorAll('.popup__item');
  }

  _getInputValues() {
    const inputValues = {};
    this._formInputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.closePopup();
    });
    super.setEventListeners();
  }

  openPopup() {
    if (this._form.id === 'form-edit-profile') {
      this._form.name.value = this._userInfo.profileName;
      this._form.about.value = this._userInfo.profileAbout;
    }
    super.openPopup();
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }
}
