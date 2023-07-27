// backend/controllers/companyController.js

const Company = require('../models/companyModel');

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new company
const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ message: 'Company created successfully' });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (e.g., unique constraint violation)
      res.status(400).json({ message: 'Company name or email already exists' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// Update an existing company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company updated successfully' });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (e.g., unique constraint violation)
      res.status(400).json({ message: 'Company name or email already exists' });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

// Delete a company
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
