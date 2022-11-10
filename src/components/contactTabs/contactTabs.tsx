import { useState, useMemo, useEffect } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import { TabWindow } from "../../constants/enums";
import { Contact } from "../../types";
import { getTabs } from "../../utils/utils";
import ContactTabItem from "../contactTabItem/contactTabItem";
import { ALL, Width } from "../../constants/constants";
import useWindowWidth from "../../hooks/useWindowWidth";

export type ContactTabsProps = {
  contacts: Contact[];
  currentTab: string;
  setTab: (tab: string) => void;
};

const ContactTabs = ({ contacts, currentTab, setTab }: ContactTabsProps) => {
  const [currentTabWindow, setCurrentTabWindow] = useState(TabWindow.First);
  const [tabWindowsCount, setTabWindowsCount] = useState(1);

  const tabs = useMemo(() => getTabs(contacts), [contacts]);
  const width = useWindowWidth();

  const incrementTabWindow = () => setCurrentTabWindow(currentTabWindow + 1);
  const decrementTabWindow = () => setCurrentTabWindow(currentTabWindow - 1);

  const getTabWindowStart = (tabWindow: number, tabWindowsCount: number) =>
    Math.ceil((26 / tabWindowsCount) * (tabWindow - 1));
  const getTabWindowEnd = (tabWindow: number, tabWindowsCount: number) =>
    Math.ceil((26 / tabWindowsCount) * tabWindow);

  useEffect(() => {
    if (width === Width.Large || width === Width.ExtraLarge) {
      setTabWindowsCount(1);
      setCurrentTabWindow(TabWindow.First);
    } else if (width === Width.Medium) {
      setTabWindowsCount(2);
      if (currentTabWindow > 2) {
        setCurrentTabWindow(TabWindow.Second);
      }
    } else setTabWindowsCount(3);
  }, [width, currentTabWindow]);

  return (
    <ul className="contact-tabs">
      <ContactTabItem
        title={ALL}
        count={contacts.length}
        handleSelect={setTab}
        isSelected={currentTab === ALL}
      />

      <span className="tab-separator" />

      {currentTabWindow !== TabWindow.First && (
        <li
          className="contact-tab-item contact-tab-btn"
          onClick={decrementTabWindow}
        >
          <FaAngleDoubleLeft />
        </li>
      )}

      {Object.keys(tabs)
        .slice(
          getTabWindowStart(currentTabWindow, tabWindowsCount),
          getTabWindowEnd(currentTabWindow, tabWindowsCount)
        )
        .map((tab, index) => (
          <ContactTabItem
            title={tab}
            count={tabs[tab]}
            handleSelect={setTab}
            isSelected={currentTab === tab}
            key={index}
          />
        ))}

      {currentTabWindow < tabWindowsCount && (
        <li
          className="contact-tab-item contact-tab-btn"
          onClick={incrementTabWindow}
        >
          <FaAngleDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default ContactTabs;
