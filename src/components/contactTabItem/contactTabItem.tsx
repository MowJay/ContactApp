import { memo } from "react";

export type ContactTabItemProps = {
  title: string;
  count: number;
  handleSelect: (tab: string) => void;
  isSelected: boolean;
};

const ContactTabItem = ({
  title,
  count,
  handleSelect,
  isSelected,
}: ContactTabItemProps) => {
  return (
    <li
      className={`contact-tab-item ${isSelected ? "current-tab" : ""} ${
        count === 0 ? "disabled-tab" : ""
      }`}
      onClick={() => {
        if (count > 0) {
          handleSelect(title);
        }
      }}
    >
      <p className="contact-tab-item-title">{title}</p>
      <p className="contact-tab-item-count">{count}</p>
    </li>
  );
};

export default memo(ContactTabItem);
