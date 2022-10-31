import React, { useState, useCallback, memo } from "react";

import { Contact } from "../types";
import ContactItem from "./contactItem";
import { filterByAlphabet } from "../utils/utils";
import { searchContacts } from "./../utils/utils";
import SearchBox from "./searchBox";
import { ALL, SMALL_WIDTH } from "./../constants/constants";

export type ContactListProps = {
  contacts: Contact[];
  currentTab: string;
  selectedContact: null | Contact;
  handleSelectContact: (selectedContact: Contact) => void;
  width: number;
};

const ContactList = ({
  contacts,
  currentTab,
  selectedContact,
  handleSelectContact,
  width,
}: ContactListProps) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = useCallback((query: string) => setQuery(query), []);

  const prepareContacts = (contacts: Contact[]) => {
    if (currentTab === ALL) {
      return searchContacts(contacts, query);
    }
    return filterByAlphabet(contacts, currentTab);
  };

  return (
    <div
      className={`contact-list-container ${
        selectedContact && width < SMALL_WIDTH ? "d-none" : ""
      }`}
    >
      {currentTab === ALL && (
        <SearchBox query={query} handleQueryChange={handleQueryChange} />
      )}
      <ul className="contact-list">
        {prepareContacts(contacts).map((contact) => (
          <ContactItem
            contact={contact}
            selected={selectedContact?.login.uuid === contact.login.uuid}
            handleClick={() => handleSelectContact(contact)}
          />
        ))}
      </ul>
    </div>
  );
};

export default memo(ContactList);
