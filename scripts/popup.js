let content = document.querySelector('.content');
let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');
let buttonEdit = content.querySelector('.profile__button-edit');
let popup = content.querySelector('.popup');
let popupName = popup.querySelector('.popup__item_profile_name');
let popupAbout = popup.querySelector('.popup__item_profile_about');
let buttonCancel = popup.querySelector('.popup__button-cancel');
let popupForm = popup.querySelector('.popup__form');

function disabledPopup() {
  return popup.classList.add('popup_disabled');
}

function openPopup () {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  return popup.classList.remove('popup_disabled');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  disabledPopup();
}

buttonEdit.addEventListener('click', openPopup);

buttonCancel.addEventListener ('click', disabledPopup);

popupForm.addEventListener('submit', formSubmitHandler);

