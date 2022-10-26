import React from "react";

import "./App.scss";
import ContactsContainer from "./components/contactsContainer";
import Header from "./components/header";

function App() {
  return (
    <div className="container">
      <Header />
      <ContactsContainer />
    </div>
  );
}

export default App;
