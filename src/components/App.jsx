import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactform/ContactForm';
import { ContactList } from './contactlist/ContactList';
import { Filter } from './filter/Filter';
import { useLocalStorage } from './uselocalstorage/UseLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const findNameInput = event => {
    setFilter(event.currentTarget.value);
  };

  const handleAddContacts = (name, number) => {
    const addedName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (addedName) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { name, id: nanoid(8), number },
    ]);
  };

  const handleContactsDelete = e => {
    setContacts(contacts.filter(contact => contact.id !== e.currentTarget.id));
  };

  const getVisibleContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm handleAddContacts={handleAddContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} findName={findNameInput} />
      {!!contacts.length && (
        <ContactList
          contacts={getVisibleContacts()}
          handleContactsDelete={handleContactsDelete}
        />
      )}
    </>
  );
};

export default App;
