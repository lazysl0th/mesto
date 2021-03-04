const content = document.querySelector('.content');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const buttonEdit = content.querySelector('.profile__button-edit');
const popup = content.querySelector('.popup');
const popupName = popup.querySelector('.popup__item_profile_name');
const popupAbout = popup.querySelector('.popup__item_profile_about');
const buttonCancel = popup.querySelector('.popup__button-cancel');
const popupForm = popup.querySelector('.popup__form');
const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');
const elements = [
  {
    elementText: 'гора Архыз, Карачаево-Черкессия',
    elementImageSrc: './images/arkhyz.jpg'
  },
  {
    elementText: 'Полуостров Камчатка',
    elementImageSrc: './images/kamchatka.jpg'
  },
  {
    elementText: 'Красная поляна, Краснодарский край',
    elementImageSrc: './images/krasnaya-polyana.jpg'
  },
  {
    elementText: 'Северная Осетия - Алания',
    elementImageSrc: './images/north-ossetia-alania.jpg'
  },
  {
    elementText: 'Остров Ольхон',
    elementImageSrc: './images/olkhon-island.jpg'
  },
  {
    elementText: 'Усть-Ленский Заповедник',
    elementImageSrc: './images/ust-lenskiy-zapovednik.jpg'
  },
];

elements.forEach(function (el) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = el.elementImageSrc;
  element.querySelector('.element__image').alt = el.elementText;
  element.querySelector('.element__text').textContent = el.elementText;

  elementsList.append(element);
})

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

