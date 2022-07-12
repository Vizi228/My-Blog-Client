import { instance } from "..";

class Requests {
  async login(res) {
    const obj = {
      email: res.email,
      password: res.password,
    };
    const login = await instance.post('auth/login', obj);
    localStorage.setItem('mern-token', login.data.token);
    return login
  }
  async register(res) {
    const obj = {
      fullName: res.fullName,
      email: res.email.trim(),
      password: res.password,
      avatarUrl: res.avatarUrl || '',
    };
    const register = await instance.post('auth/register', obj);
    localStorage.setItem('mern-token', register.data.token);
    return register
  }
  async checkAuth() {
    const check = await instance.get('/auth/me');
    return check
  }
}

export const Auth = new Requests()