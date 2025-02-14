// Simple auth service using localStorage
class AuthService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async login(email, password) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    this.currentUser = { ...user, password: undefined };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  async register(email, password) {
    const exists = this.users.some(u => u.email === email);
    if (exists) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    
    this.currentUser = { ...newUser, password: undefined };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  async logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}

export const auth = new AuthService();
