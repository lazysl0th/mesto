let content = document.querySelector('.content');

function toggleClass(c) {
  let firstClass = c.classList[0] + '_disabled';
  return c.classList.toggle(firstClass);
}

let profileName = content.querySelector('.profile__name');
let profileAbout = content.querySelector('.profile__about');
let buttonEdit = content.querySelector('.profile__button-edit');
let popup = content.querySelector('.popup');
let popupName = popup.querySelector('.popup__item_name');
let popupAbout = popup.querySelector('.popup__item_about');

buttonEdit.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  toggleClass(popup);
  }
)

let buttonCancel = popup.querySelector('.popup__button-cancel');
buttonCancel.addEventListener ('click', toggleClass.bind(null, popup));

let popupForm = popup.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    toggleClass(popup);
}

popupForm.addEventListener('submit', formSubmitHandler);

let buttonLike = content.querySelectorAll('.element__button-like');

for (let i = 0; i < buttonLike.length; i++) {
  buttonLike[i].addEventListener ('click', toggleClass.bind(null, buttonLike[i]));
}

