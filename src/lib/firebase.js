// Mock implementation of Firebase Auth
class MockAuth {
  constructor() {
    this.currentUser = null;
    this.listeners = new Set();
  }

  onAuthStateChanged(listener) {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => this.listeners.delete(listener);
  }

  async signInWithEmailAndPassword(email, password) {
    this.currentUser = { email, uid: '123', displayName: email.split('@')[0] };
    this.listeners.forEach(listener => listener(this.currentUser));
    return { user: this.currentUser };
  }

  async createUserWithEmailAndPassword(email, password) {
    this.currentUser = { email, uid: '123', displayName: email.split('@')[0] };
    this.listeners.forEach(listener => listener(this.currentUser));
    return { user: this.currentUser };
  }

  async signOut() {
    this.currentUser = null;
    this.listeners.forEach(listener => listener(null));
  }
}

// Create mock instances
const mockAuth = new MockAuth();
const mockDb = {
  collection: () => ({
    doc: () => ({
      set: async () => {},
      get: async () => ({
        exists: true,
        data: () => ({})
      })
    }),
    where: () => ({
      get: async () => ({
        empty: true,
        docs: []
      })
    })
  })
};
const mockStorage = {
  ref: () => ({
    put: async () => {},
    getDownloadURL: async () => 'https://example.com/mock-url'
  })
};

// Export mock services
export const auth = mockAuth;
export const db = mockDb;
export const storage = mockStorage;
