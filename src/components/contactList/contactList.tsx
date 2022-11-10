import { useState, useCallback, memo } from "react";

import { Contact } from "../../types";
import ContactItem from "../contactItem/contactItem";
import { filterByAlphabet } from "../../utils/utils";
import { searchContacts } from "../../utils/utils";
import SearchBox from "../searchBox";
import { ALL, Width } from "../../constants/constants";
import useWindowWidth from "./../../hooks/useWindowWidth/index";

export type ContactListProps = {
  contacts: Contact[];
  currentTab: string;
  selectedContact: null | Contact;
  handleSelectContact: (selectedContact: Contact) => void;
};

const ContactList = ({
  contacts,
  currentTab,
  selectedContact,
  handleSelectContact,
}: ContactListProps) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = useCallback((query: string) => setQuery(query), []);

  const prepareContacts = (contacts: Contact[]) => {
    if (currentTab === ALL) {
      return searchContacts(contacts, query);
    }
    return filterByAlphabet(contacts, currentTab);
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
