import { Contact, Tabs } from "../types";

export function getAlphabets() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
}

export function searchContacts(contacts: Contact[], query: string) {
  return contacts.filter(
    (contact: Contact) =>
      contact.name.last.toLowerCase().includes(query.toLowerCase()) ||
      contact.name.first.toLowerCase().includes(query.toLowerCase())
  );
}

export function sortContacts(contacts: Contact[]) {
  return contacts.sort((a: Contact, b: Contact) =>
    a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
  );
}

export function getInitialTabs() {
  const tabs: Tabs = {};
  const alphabets = getAlphabets();

  alphabets.forEach((alphabet) => (tabs[alphabet] = []));

  return tabs;
}

export function getTabs(contacts: Contact[]) {
  const tabs: Tabs = getInitialTabs();

  contacts.forEach((contact) => {
    const alphabet = contact.name.last.toUpperCase().charAt(0);
    if (Array.isArray(tabs[alphabet])) tabs[alphabet].push(contact);
  });

  return tabs;
}
