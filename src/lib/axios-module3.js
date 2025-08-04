import axios from "axios";

const axiosInstanceModule3 = axios.create({
  baseURL: "http://74.225.201.125:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstanceModule3;
