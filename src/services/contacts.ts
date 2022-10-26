import axios from "axios";

export function getContacts(count: number = 200) {
  return axios.get(`https://randomuser.me/api/?page=1&results=${count}`);
}
