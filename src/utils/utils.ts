import { Contact } from "../types";

export function geAlphabets() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

export function filterByAlphabet(contacts: Contact[], alphabet: string) {
  return contacts.filter((contact: Contact) =>
    contact.name.last.toLowerCase().startsWith(alphabet.toLowerCase())
  );
}

export function searchContacts(contacts: Contact[], query: string) {
  return contacts.filter(
    (contact: Contact) =>
      contact.name.last.toLowerCase().includes(query.toLowerCase()) ||
      contact.name.first.toLowerCase().includes(query.toLowerCase())
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
