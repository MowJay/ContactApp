import * as React from "react";
import { Contact } from "../types";

export type ContactItemProps = {
  contact: Contact;
  selected: boolean;
  handleClick: () => void;
};

const ContactItem = ({ contact, selected, handleClick }: ContactItemProps) => {
  return (
    <li
      className={`contact-item ${selected ? "selected-contact" : ""}`}
      onClick={handleClick}
    >
      <img
        className="contact-item-image"
        src={contact.picture.thumbnail}
        alt="contact"
      />
      <div>
        <p className="contact-item-title">
          {contact.name.last}, {contact.name.first}
        </p>
        <p className="contact-item-description">{contact.cell}</p>
      </div>
    </li>
  );
};

export default ContactItem;
