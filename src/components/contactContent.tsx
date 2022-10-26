import React, { useState, useCallback, memo } from "react";

import { Contact } from "../types";
import ContactList from "./contactList";
import ContactDetails from "./contactDetails";

export type ContactContentProps = {
  contacts: Contact[];
  currentTab: string;
  width: number;
};

const ContactContent = ({
  contacts,
  currentTab,
  width,
}: ContactContentProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = useCallback(
    (contact: Contact) => setSelectedContact(contact),
    []
  );

  const unSelectContact = useCallback(() => setSelectedContact(null), []);

  return (
    <div className="contact-content">
      <ContactList
        contacts={contacts}
        currentTab={currentTab}
        selectedContact={selectedContact}
        handleSelectContact={handleSelectContact}
        width={width}
      />
      <ContactDetails contact={selectedContact} handleClose={unSelectContact} />
    </div>
  );
};

export default memo(ContactContent);
