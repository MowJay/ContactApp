import {
  useState,
  useEffect,
  createContext,
  useContext,
  useTransition,
} from "react";

import { getInitialTabs, getTabs, sortContacts } from "./../../utils/utils";
import { Contact, Tabs } from "../../types";
import { getContacts } from "../../services/contacts";

export type ContactsContextType = {
  contacts: Contact[];
  fetchContacts: () => void;
  tabs: Tabs;
  contactLoading: boolean;
};

const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
  fetchContacts: () => {},
  tabs: {},
  contactLoading: false,
});

export const ContactsContextProvider = ({ children }: { children: any }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsFetching, setContactsFetching] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [tabs, setTabs] = useState<Tabs>(() => getInitialTabs());

  useEffect(() => {
    setTabs(getTabs(contacts));
  }, [contacts]);

  const handleSetContacts = (contacts: Contact[]) =>
    startTransition(() => setContacts(sortContacts(contacts)));

  const fetchContacts = () => {
    setContactsFetching(true);
    getContacts().then((contacts) => {
      setContactsFetching(false);
      handleSetContacts(contacts);
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        fetchContacts,
        tabs,
        contactLoading: isPending || contactsFetching,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export function useContacts() {
  const { contacts, contactLoading, fetchContacts, tabs } =
    useContext(ContactsContext);
  return {
    contacts,
    contactLoading,
    fetchContacts,
    tabs,
  };
}
