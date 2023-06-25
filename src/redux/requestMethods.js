import axios from "axios";

let BASE_URL = "https://my-shop-rest-api.vercel.app/";

export let publicRequest = axios.create({
  baseURL: BASE_URL,
});


