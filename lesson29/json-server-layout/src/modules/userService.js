export class UserService {
  constructor() {
    this.url = 'http://localhost:4545/users';
  }

  async getData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async sendData(url, user, method) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: user
      });
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Get Data
  getUsers() {
    return this.getData(this.url)
  }

  getUser(id) {
    return this.getData(`${this.url}/${id}`);
  }

  filterUsers(filterOption) {
    return this.getData(`${this.url}?${filterOption}=true`);
  }

  getSortUsers(sortOption) {
    return this.getData(`${this.url}?_sort=${sortOption.name}&_order=${sortOption.value}`);
  }

  getSearchUsers(str) {
    return this.getData(`${this.url}?name_like=${str}`);
  }

  //Send Data
  addUser(user) {
    return this.sendData(this.url, JSON.stringify(user), 'POST')
  }

  removeUser(id) {
    return this.sendData(`${this.url}/${id}`, null, 'DELETE')
  }

  changeUser(id, data) {
    return this.sendData(`${this.url}/${id}`, JSON.stringify(data), 'PATCH')
  }

  editUser(id, user) {
    return this.sendData(`${this.url}/${id}`, JSON.stringify(user), 'PUT')
  }
}