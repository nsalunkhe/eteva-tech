// backend/routes/companyRoutes.js

const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// GET all companies
router.get('/companies', companyController.getAllCompanies);

// GET a company by ID
router.get('/companies/:id', companyController.getCompanyById); // Add this route

// POST a new company
router.post('/companies', companyController.createCompany);

// PUT (Update) an existing company by ID
router.put('/companies/:id', companyController.updateCompany);

// DELETE an existing company by ID
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;
