import { useState, useCallback, memo } from "react";

import { Contact } from "../../types";
import ContactItem from "../contactItem/contactItem";
import { searchContacts } from "../../utils/utils";
import SearchBox from "../searchBox";
import { ALL, Width } from "../../constants/constants";
import useWindowWidth from "./../../hooks/useWindowWidth/index";
import { useContacts } from "./../../hooks/useContacts/useContacts";

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

  const { contacts, tabs } = useContacts();

  const handleQueryChange = useCallback((query: string) => setQuery(query), []);

  const prepareContacts = (contacts: Contact[]) => {
    if (currentTab === ALL) {
      return searchContacts(contacts, query);
    }
    return tabs[currentTab];
  };

  const width = useWindowWidth();

  return (
    <div
      className={`contact-list-container ${
        selectedContact && width === Width.Small ? "d-none" : ""
      }`}
    >
      {currentTab === ALL && (
        <SearchBox query={query} handleQueryChange={handleQueryChange} />
      )}
      <ul className="contact-list">
        {prepareContacts(contacts).map((contact, index) => (
          <ContactItem
            contact={contact}
            selected={selectedContact?.login.uuid === contact.login.uuid}
            handleClick={() => handleSelectContact(contact)}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default memo(ContactList);
