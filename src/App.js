import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Section from './components/Section/Section';
import Form from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import FilterContact from './components/FilterContacts/FilterContacts';
import Contacts from './data/contacts.json';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? Contacts;
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(contact => [
      ...contact,
      (contact = {
        id: uuidv4(),
        name: newContact.name,
        number: newContact.number,
      }),
    ]);
  };

  const filterContact = e => {
    setFilter(e.currentTarget.value);
  };

  const getContactsLis = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const checkContact = name => {
    const inContact = !!contacts.find(contact => contact.name === name);
    inContact && alert(name + ' is already in contacts');
    return !inContact;
  };

  const deleteContact = contactId => {
    setContacts(() => contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Section>
        <Form onSubmit={addContact} onCheckContact={checkContact} />
      </Section>
      <Section title="Contacts">
        <FilterContact value={filter} onChange={filterContact} />
        <ContactList
          contacts={getContactsLis()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};

export default App;
