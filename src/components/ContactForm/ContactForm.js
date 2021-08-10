import { useState } from 'react';

import s from './ContactForm.module.css';
import Button from '../Button/Button';

const ContactForm = ({ onSubmit, onCheckContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const formSubmit = e => {
    e.preventDefault();
    const isNoName = onCheckContact(name);
    if (!isNoName) return;
    onSubmit({ name, number });
    resetForm();
  };

  return (
    <form className={s.form} onSubmit={formSubmit}>
      <label className={s.label}>
        Name
        <input
          placeholder="type name"
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={inputChange}
        />
      </label>

      <label className={s.label}>
        Number
        <input
          placeholder="type number"
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={inputChange}
        />
      </label>

      <Button type="submit">Add contact</Button>
    </form>
  );
};

export default ContactForm;
