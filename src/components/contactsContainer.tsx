import React, { useState, useEffect, useCallback } from "react";
import ContactTabs from "./contactTabs";

import { getContacts } from "../services/contacts";
import ContactContent from "./contactContent";

const ContactsContainer = () => {
  const [contacts, setContacts] = useState([]);
  const [currentTab, setCurrentTab] = useState("All");
  const [width, setWidth] = useState(1100);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const handleCurrentTabChange = useCallback(
    (tab: string) => setCurrentTab(tab),
    []
  );

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    getContacts().then((response) => setContacts(response.data.results));
  }, []);

  return (
    <div className="contact-container">
      <ContactTabs
        contacts={contacts}
        currentTab={currentTab}
        setTab={handleCurrentTabChange}
        width={width}
      />
      <ContactContent
        contacts={contacts}
        currentTab={currentTab}
        width={width}
      />
    </div>
  );
};

export default ContactsContainer;
