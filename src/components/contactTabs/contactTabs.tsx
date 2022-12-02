import { useState, useEffect } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import ContactTabItem from "../contactTabItem/contactTabItem";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useContacts } from "./../../hooks/useContacts";
import { TabWindow } from "../../constants/enums";
import { ALL, Width } from "../../constants/constants";

export type ContactTabsProps = {
  currentTab: string;
  setTab: (tab: string) => void;
};

const ContactTabs = ({ currentTab, setTab }: ContactTabsProps) => {
  const [currentTabWindow, setCurrentTabWindow] = useState(TabWindow.First);
  const [tabWindowsCount, setTabWindowsCount] = useState(1);

  const { tabs, contacts } = useContacts();
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
            count={tabs[tab].length}
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
