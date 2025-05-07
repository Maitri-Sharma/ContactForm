import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);

  const API_BASE = "https://localhost:5000/api/Form";

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_BASE);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, phone, email };

    try {
      await axios.post(API_BASE, contactData);
      alert("Contact submitted successfully!");
      setName("");
      setPhone("");
      setEmail("");
      fetchContacts(); // Refresh the list after successful submission
    } catch (error) {
      console.error("There was an error submitting the form", error);
      alert("There was an error submitting the form");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Submit Contact</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>Submitted Contacts</h2>
      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong> - {contact.phone} - {contact.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts submitted yet.</p>
      )}
    </div>
  );
};

export default ContactForm;
