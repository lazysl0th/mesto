const content = document.querySelector('.content');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');
export const buttonEdit = content.querySelector('.profile__button-edit');
export const buttonAdd = content.querySelector('.profile__button-add');
export const popupFigureImage = content.querySelector('.popup__image');
export const popupFigcap = content.querySelector('.popup__text');
export const popupEditProfile = content.querySelector('.popup_form_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__content_type_form');
export const popupAddElement = content.querySelector('.popup_form_add-element');
export const formAddElement = popupAddElement.querySelector('.popup__content_type_form');
export const popupSubmitDeleteElement = content.querySelector('.popup_form_submit-delete-element');
export const formSubmitDeleteElement = popupAddElement.querySelector('.popup__content_type_form');
export const validationSetting = {
  formSelector: '.popup__content_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_active'
}
