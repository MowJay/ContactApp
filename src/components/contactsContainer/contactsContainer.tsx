import { useState, useEffect, useCallback } from "react";

import ContactTabs from "../contactTabs/contactTabs";
import ContactsContent from "../contactsContent/contactsContent";
import { getContacts } from "../../services/contacts";
import { ALL } from "../../constants/constants";
import { useContacts } from "./../../hooks/useContacts/useContacts";

const ContactsContainer = () => {
  const [currentTab, setCurrentTab] = useState(ALL);

  const handleCurrentTabChange = useCallback(
    (tab: string) => setCurrentTab(tab),
    []
  );
  const { fetchContacts } = useContacts();

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contact-container">
      <ContactTabs currentTab={currentTab} setTab={handleCurrentTabChange} />
      <ContactsContent currentTab={currentTab} />
    </div>
  );
};

export default ContactsContainer;
