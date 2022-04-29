import axios from "axios";


export default axios.create({
  baseURL: process.env.VUE_APP_BACKEND,
  headers: {
    "Content-type": "application/json"
  }
});
