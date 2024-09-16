const contacts = require("../models/contacts");
const { Errors, Wrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json(data);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.json(data);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  if (!data) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.json({ message: "Contact deleted" });
  }
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const data = await contacts.updateContact(contactId, req.body);
  if (!data) {
    throw Errors(404, error.message);
  }
  res.json(data);
};

module.exports = {
  getAll: Wrapper(getAll),
  getById: Wrapper(getById),
  add: Wrapper(add),
  deleteById: Wrapper(deleteById),
  updateById: Wrapper(updateById),
};
