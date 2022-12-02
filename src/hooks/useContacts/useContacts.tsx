import { useState, useEffect, createContext, useContext } from "react";

import { getInitialTabs, getTabs, sortContacts } from "./../../utils/utils";
import { Contact, Tabs } from "../../types";

export type ContactsContextType = {
  contacts: Contact[];
  handelSetContacts: (contacts: Contact[]) => void;
  tabs: Tabs;
};

const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
  handelSetContacts: () => {},
  tabs: {},
});

export const ContactsContextProvider = ({ children }: { children: any }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tabs, setTabs] = useState<Tabs>(() => getInitialTabs());

  useEffect(() => {
    setTabs(getTabs(contacts));
  }, [contacts]);

  const handelSetContacts = (contacts: Contact[]) =>
    setContacts(sortContacts(contacts));

  return (
    <ContactsContext.Provider value={{ contacts, handelSetContacts, tabs }}>
      {children}
    </ContactsContext.Provider>
  );
};

export function useContacts() {
  const { contacts, handelSetContacts, tabs } = useContext(ContactsContext);
  return {
    contacts,
    handelSetContacts,
    tabs,
  };
}
