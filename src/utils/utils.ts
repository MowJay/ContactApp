import { Contact } from "../types";

export function geAlphabets() {
  return new Array(26).fill(1).map((_, i) => String.fromCharCode(65 + i));
}

export function filterByAlphabet(contacts: Contact[], alphabet: string) {
  return contacts.filter((contact: Contact) =>
    contact.name.last
      .toLocaleLowerCase()
      .startsWith(alphabet.toLocaleLowerCase())
  );
}

export function searchContacts(contacts: Contact[], query: string) {
  return contacts.filter(
    (contact: Contact) =>
      contact.name.last
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()) ||
      contact.name.first.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
}

export function getTabs(contacts: Contact[]) {
  const tabs: { [key: string]: number } = {};
  const alphabets = geAlphabets();
  alphabets.forEach((alphabet) => (tabs[alphabet] = 0));

  contacts.forEach((contact) => {
    const char: string = contact.name.last.charAt(0).toUpperCase();
    if (alphabets.includes(char)) tabs[char] += 1;
  });
  return tabs;
}
