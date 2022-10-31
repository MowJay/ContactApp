import React, { useState, useMemo, useEffect, memo } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import { Contact } from "../types";
import { getTabs } from "./../utils/utils";
import ContactTabItem from "./contactTabItem";
import { ALL, Width } from "./../constants/constants";

export type ContactTabsProps = {
  contacts: Contact[];
  currentTab: string;
  setTab: (tab: string) => void;
  width: Width;
};

const ContactTabs = ({
  contacts,
  currentTab,
  setTab,
  width,
}: ContactTabsProps) => {
  const [tabGroup, setTabGroup] = useState(1);
  const [tabGroupCount, setTabGroupCount] = useState(1);

  const tabs = useMemo(() => getTabs(contacts), [contacts]);

  const incrementTabGroup = () => setTabGroup(tabGroup + 1);
  const decrementTabGroup = () => setTabGroup(tabGroup - 1);

  const getTabGroupStart = (tabGroup: number, tabGroupCount: number) =>
    Math.ceil((26 / tabGroupCount) * (tabGroup - 1));
  const getTabGroupEnd = (tabGroup: number, tabGroupCount: number) =>
    Math.ceil((26 / tabGroupCount) * tabGroup);

  useEffect(() => {
    if (width === Width.Large) {
      setTabGroupCount(1);
      setTabGroup(1);
    } else if (width === Width.Medium) {
      setTabGroupCount(2);
      if (tabGroup > 2) {
        setTabGroup(2);
      }
    } else setTabGroupCount(3);
  }, [width, tabGroup]);

  return (
    <ul className="contact-tabs">
      <ContactTabItem
        title={ALL}
        count={contacts.length}
        handleSelect={setTab}
        isSelected={currentTab === ALL}
      />

      <span className="tab-separator" />

      {tabGroup > 1 && (
        <li
          className="contact-tab-item contact-tab-btn"
          onClick={decrementTabGroup}
        >
          <FaAngleDoubleLeft />
        </li>
      )}

      {Object.keys(tabs)
        .slice(
          getTabGroupStart(tabGroup, tabGroupCount),
          getTabGroupEnd(tabGroup, tabGroupCount)
        )
        .map((tab) => (
          <ContactTabItem
            title={tab}
            count={tabs[tab]}
            handleSelect={setTab}
            isSelected={currentTab === tab}
          />
        ))}

      {tabGroup < tabGroupCount && (
        <li
          className="contact-tab-item contact-tab-btn"
          onClick={incrementTabGroup}
        >
          <FaAngleDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default memo(ContactTabs);
