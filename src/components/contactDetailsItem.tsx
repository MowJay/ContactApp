import React, { memo } from "react";

export type ContactDetailsItemProps = {
  title: string;
  data: string;
  icon: any;
};

const ContactDetailsItem = ({ title, data, icon }: ContactDetailsItemProps) => {
  return (
    <div className="d-flex" style={{ marginTop: 20 }}>
      {icon}
      <div style={{ marginLeft: 8 }}>
        <b className="m-0">{title}</b>
        <p style={{ margin: 0, marginTop: 4 }}>{data}</p>
      </div>
    </div>
  );
};

export default memo(ContactDetailsItem);
