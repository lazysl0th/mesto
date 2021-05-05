export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.userId = '';
  }
  getUserInfo() {
    const profileName = this._name.textContent;
    const profileAbout = this._about.textContent;
    const profileAvatar = this._avatar.src;
    return { profileName, profileAbout, profileAvatar };
  }

  setUserInfo( {name, about, avatar, _id} ) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this.userId = _id;
  }
}
