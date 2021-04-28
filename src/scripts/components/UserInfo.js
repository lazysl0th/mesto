export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const profileName = this._name.textContent;
    const profileAbout = this._about.textContent;
    return { profileName, profileAbout };
  }

  setUserInfo( {name, about, avatar} ) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
}
