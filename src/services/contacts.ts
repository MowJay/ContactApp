import axios from "axios";

import { Contact } from "../types";

export function getContacts(count: number = 200) {
  return new Promise((resolve: (contacts: Contact[]) => void, reject) => {
    axios
      .get(`https://randomuser.me/api/?page=1&results=${count}`)
      .then((response: { data: { results: Contact[] } }) =>
        resolve(response.data.results)
      );
  });
}
