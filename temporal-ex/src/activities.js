import axios from "axios";

export async function greet(name) {
  axios.get(`http://localhost:7000?name=${name}`)
  return `Hello, ${name}!`;
}

export async function unGreet(name) {
  axios.get(`http://localhost:7000/next?name=${name}`)
  return `Not Hello, ${name}!`;
}

