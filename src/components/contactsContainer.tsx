import React, { useState, useEffect, useCallback } from "react";

import ContactTabs from "./contactTabs";
import ContactContent from "./contactContent";
import { getContacts } from "../services/contacts";
import {
  ALL,
  SMALL_WIDTH,
  MEDIUM_WIDTH,
  Width,
} from "./../constants/constants";

const ContactsContainer = () => {
  const [contacts, setContacts] = useState([]);
  const [currentTab, setCurrentTab] = useState(ALL);
  const [width, setWidth] = useState<Width>(Width.Large);

  const updateDimensions = () => {
    if (window.innerWidth > MEDIUM_WIDTH) {
      setWidth(Width.Large);
    } else if (window.innerWidth > SMALL_WIDTH) {
      setWidth(Width.Medium);
    } else {
      setWidth(Width.Small);
    }
  };

  const handleCurrentTabChange = useCallback(
    (tab: string) => setCurrentTab(tab),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    getContacts().then((response) => setContacts(response.data.results));
  }, []);

  console.log("dsa");

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
