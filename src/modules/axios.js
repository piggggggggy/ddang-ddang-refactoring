import axios from "axios";

export const instance = axios.create({
    // baseURL: "",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
        "Access-Control-Allow-Origin": "*",
    },
});


export async function get(url, config) {
  return axios.get(url, config)
}

export async function post(url, data, config) {
  return axios.post(url, data, config)
}

export async function put(url, data, config) {
  return axios.put(url, data, config)
}

export async function patch(url, data, config) {
  return axios.patch(url, data, config)
}

export async function del(url, config) {
  return axios.delete(url, config)
}

