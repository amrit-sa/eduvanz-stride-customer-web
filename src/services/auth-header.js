export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user_id"));
  const token = JSON.parse(localStorage.getItem("token"));
  if (user && token ) {
    return { Authorization: "Bearer " + token, "x-access-token": user.accessToken, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  } else {
    return {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
  }
}

export function sfHeader(token) {
  return { Authorization: "Bearer " + token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS'};
}
