export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userNameElement = userNameSelector;
    this._userDescriptionElement = userDescriptionSelector;
    this._userAvatar = avatarSelector;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.userName;
    this._userDescriptionElement.textContent = data.userDescription;
  }

  setAvatar(avatarSelector) {
    this._userAvatar.src = avatarSelector;
  }
}
