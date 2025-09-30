// Simple authentication utilities using localStorage
export const authService = {
  // Generate a simple token (not secure, just for demo)
  generateToken: (user) => {
    return btoa(JSON.stringify({ ...user, exp: Date.now() + 86400000 })); // 24 hours
  },

  // Store user and token in localStorage
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('gdg_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = authService.generateToken(user);
      localStorage.setItem('gdg_token', token);
      localStorage.setItem('gdg_user', JSON.stringify(user));
      return { success: true, user, token };
    }
    
    return { success: false, message: 'Invalid credentials' };
  },

  // Register new user
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('gdg_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('gdg_users', JSON.stringify(users));
    
    const token = authService.generateToken(newUser);
    localStorage.setItem('gdg_token', token);
    localStorage.setItem('gdg_user', JSON.stringify(newUser));
    
    return { success: true, user: newUser, token };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('gdg_token');
    localStorage.removeItem('gdg_user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('gdg_token');
    if (!token) return false;

    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('gdg_user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('gdg_token');
  }
};