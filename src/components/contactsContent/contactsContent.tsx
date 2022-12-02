import { useState, useCallback } from "react";

import { Contact } from "../../types";
import ContactList from "../contactList/contactList";
import ContactDetails from "../contactDetails/contactDetails";

export type ContactsContentProps = {
  currentTab: string;
};

const ContactsContent = ({ currentTab }: ContactsContentProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSelectContact = useCallback(
    (contact: Contact) => setSelectedContact(contact),
    []
  );

  const handleUnselectContact = useCallback(() => setSelectedContact(null), []);

  return (
    <div className="contact-content">
      <ContactList
        currentTab={currentTab}
        selectedContact={selectedContact}
        handleSelectContact={handleSelectContact}
      />
      <ContactDetails
        contact={selectedContact}
        handleClose={handleUnselectContact}
      />
    </div>
  );
};

export default ContactsContent;
