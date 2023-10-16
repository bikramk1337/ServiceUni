export function getUser(){
    const token = localStorage.getItem('jwt_token');

    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    const user = JSON.parse(window.atob(base64))

    return user
  }

  export function isAdmin(){
    const token = localStorage.getItem('jwt_token');

    if (token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
    
      const roles = JSON.parse(window.atob(base64)).permissions;
    
      if ( roles === 'admin' ) {
        return true;
      } else {
        return false;
      }
    }
  }