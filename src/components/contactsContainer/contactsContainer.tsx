import { useState, useEffect, useCallback } from "react";

import ContactTabs from "../contactTabs/contactTabs";
import ContactContent from "../contactContent/contactContent";
import { getContacts } from "../../services/contacts";
import { ALL } from "../../constants/constants";
import { Contact } from "../../types";

const ContactsContainer = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentTab, setCurrentTab] = useState(ALL);

  const handleCurrentTabChange = useCallback(
    (tab: string) => setCurrentTab(tab),
    []
  );

  useEffect(() => {
    getContacts().then((contacts) => setContacts(contacts));
  }, []);

  return (
    <div className="contact-container">
      <ContactTabs
        contacts={contacts}
        currentTab={currentTab}
        setTab={handleCurrentTabChange}
      />
      <ContactContent contacts={contacts} currentTab={currentTab} />
    </div>
  );
};

export default ContactsContainer;
