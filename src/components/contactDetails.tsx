import React, { memo } from "react";
import {
  MdEmail,
  MdPhone,
  MdPhoneIphone,
  MdLocationPin,
  MdClose,
} from "react-icons/md";

import { Contact } from "../types";
import ContactDetailsItem from "./contactDetailsItem";

export type ContactDetailsProps = {
  contact: null | Contact;
  handleClose: () => void;
};

const ContactDetails = ({ contact, handleClose }: ContactDetailsProps) => {
  if (!contact) return null;
  return (
    <div className="contact-details-container">
      <div className="contact-details-card">
        <img
          src={contact.picture.large}
          alt="contact profile"
          className="contact-details-image"
        />

        <p className="contact-details-name">
          {contact.name.first} {contact.name.last}
        </p>

        <p className="contact-details-username">{contact.login.username}</p>

        <ContactDetailsItem
          title={"Cell"}
          data={contact.cell}
          icon={<MdPhoneIphone color="#52525B" size={20} />}
        />
        <ContactDetailsItem
          title={"Phone"}
          data={contact.phone}
          icon={<MdPhone color="#52525B" size={20} />}
        />
        <ContactDetailsItem
          title={"Email"}
          data={contact.email}
          icon={<MdEmail color="#52525B" size={20} />}
        />
        <ContactDetailsItem
          title={"Location"}
          data={`${contact.location.country}, ${contact.location.state}, ${contact.location.city}`}
          icon={<MdLocationPin color="#52525B" size={20} />}
        />

        <MdClose size={28} className="btn-close" onClick={handleClose} />
      </div>
    </div>
  );
};

export default memo(ContactDetails);
