import axios from "axios";

let BASE_URL = "https://my-shop-rest-api.vercel.app/";
let TOKEN = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root")).user
).token;
console.log(TOKEN);

export let publicRequest = axios.create({
  baseURL: BASE_URL,
});

export let userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
