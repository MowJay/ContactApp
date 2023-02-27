import { useState, useCallback, memo, useMemo } from "react";

import { Contact } from "../../types";
import ContactItem from "../contactItem/contactItem";
import { searchContacts } from "../../utils/utils";
import SearchBox from "../searchBox";
import { ALL, Width } from "../../constants/constants";
import useWindowWidth from "./../../hooks/useWindowWidth/index";
import { useContacts } from "./../../hooks/useContacts/useContacts";
import Spinner from "./../common/spinner";

export type ContactListProps = {
  currentTab: string;
  selectedContact: null | Contact;
  handleSelectContact: (selectedContact: Contact) => void;
};

const ContactList = ({
  currentTab,
  selectedContact,
  handleSelectContact,
}: ContactListProps) => {
  const [query, setQuery] = useState("");

  const { contacts, tabs, contactLoading } = useContacts();

  const handleQueryChange = useCallback((query: string) => setQuery(query), []);

  const width = useWindowWidth();

  const visibleContacts = useMemo(() => {
    if (currentTab === ALL) {
      return searchContacts(contacts, query);
    }
    return tabs[currentTab];
  }, [currentTab, query, contacts, tabs]);

  return (
    <div
      className={`contact-list-container ${
        selectedContact && width === Width.Small ? "d-none" : ""
      }`}
    >
      {currentTab === ALL && (
        <SearchBox query={query} handleQueryChange={handleQueryChange} />
      )}
      {contactLoading ? (
        <Spinner />
      ) : (
        <ul className="contact-list">
          {visibleContacts.map((contact, index) => (
            <ContactItem
              contact={contact}
              selected={selectedContact?.login.uuid === contact.login.uuid}
              handleClick={() => handleSelectContact(contact)}
              key={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(ContactList);
