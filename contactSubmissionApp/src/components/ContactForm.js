import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import './ContactForm.css'; // import the CSS file for custom styling

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access the API_BASE URL from environment variables
  const API_BASE = process.env.REACT_APP_API_BASE;

  // Fetch contacts from backend
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/GetContactDetails`);
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setError("There was an error fetching the contacts.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for name (alphanumeric and spaces allowed)
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Name must be alphanumeric and may include spaces.");
      return;
    }

    const contactData = { name, phone, email };

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/UpdateContactDetails`, contactData);
      alert("Contact details submitted successfully!");

      // Clear the form
      setName("");
      setPhone("");
      setEmail("");

      // Add the new contact to the state optimistically
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (error) {
      console.error("There was an error submitting the form", error);
      setError(error.response?.data?.message || "There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2 className="form-title">Submit Contact</h2>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter full name"
          />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter phone number"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email address"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Save Contact"}
        </button>
      </form>

      <hr />

      <h2 className="contact-list-title">Submitted Contacts</h2>
      {loading ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : contacts.length > 0 ? (
        <div className="contact-list">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <strong>{contact.name}</strong>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No contacts submitted yet.</p>
      )}
    </div>
  );
};

export default ContactForm;
