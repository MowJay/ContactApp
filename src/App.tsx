import ContactsContainer from "./components/contactsContainer";
import Header from "./components/header";
import { ContactsContextProvider } from "./hooks/useContacts/useContacts";
import "./App.scss";

function App() {
  return (
    <ContactsContextProvider>
      <Header />
      <ContactsContainer />
    </ContactsContextProvider>
  );
}

export default App;
