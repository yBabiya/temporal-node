import axios from "axios";

export async function sendConfirmation(name) {
  axios.get(`http://localhost:7000?confirmation=${name}`)
  return `Hello, ${name}!`;
}

export async function alertBlocked(name) {
  axios.get(`http://localhost:7000/blocked?name=${name}`)
  return `Not Hello, ${name}!`;
}

