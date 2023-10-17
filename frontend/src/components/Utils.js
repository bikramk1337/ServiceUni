// Helper function to decode the JWT token
function decodeToken() {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
      return null;
  }

  try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
  } catch (e) {
      console.error("Error decoding the JWT token:", e);
      return null;
  }
}

export function getUser() {
  return decodeToken();
}

export function isAdmin() {
  const decodedToken = decodeToken();
  return decodedToken && decodedToken.permissions === 'admin';
}

export function getUserDetails() {
  const decodedToken = decodeToken();

  if (!decodedToken) {
      return null;
  }

  return {
      id: decodedToken.id,
      email: decodedToken.sub,
      firstName: decodedToken.first_name,
      lastName: decodedToken.last_name,
      permissions: decodedToken.permissions
  };
}
