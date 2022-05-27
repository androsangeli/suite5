export default function authHeader() {
  let token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return { Authorization: 'Bearer ' + token, 'Content-Type' : 'application/json', 'Accept': 'application/json' };
  } else {
    return {};
  }
}
