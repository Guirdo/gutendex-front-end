/* eslint-disable require-jsdoc */
class UserBehaviourDataBase {
  constructor() {
    this.searchs = JSON.parse(localStorage.getItem('searchs')) || [];
  }

  addSearch(search) {
    this.searchs.push(search);
    localStorage.setItem('searchs', JSON.stringify(this.searchs));
  }
}

export default UserBehaviourDataBase;
