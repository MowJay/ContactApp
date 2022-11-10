import { useState, useCallback } from "react";

import { Contact } from "../../types";
import ContactList from "../contactList/contactList";
import ContactDetails from "../contactDetails/contactDetails";

export type ContactContentProps = {
  contacts: Contact[];
  currentTab: string;
};

const ContactContent = ({ contacts, currentTab }: ContactContentProps) => {
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
      />
      <ContactDetails contact={selectedContact} handleClose={unSelectContact} />
    </div>
  );
};

export default ContactContent;
