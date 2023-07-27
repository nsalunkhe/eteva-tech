import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../Redux/actions/CompanyActions';
// import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CompanyForm.css'; // Import custom CSS file

const CompanyForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);

  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    contactNumber: '',
    contactEmail: '',
    logo: '',
    state: '',
    city: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let alertTimer;
    if (showAlert) {
      alertTimer = setTimeout(() => {
        setShowAlert(false);
      }, 2000); // 2000 milliseconds = 2 seconds
    }
    return () => {
      clearTimeout(alertTimer);
    };
  }, [showAlert]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the company name is already taken
    const companyNameTaken = companies.some(
      (company) => company.companyName.toLowerCase() === formData.companyName.toLowerCase()
    );

    if (companyNameTaken) {
      setError('Error: Company name is already taken.');
      setShowAlert(true);
      return;
    }

    try {
      await dispatch(addCompany(formData));
      setSuccess('Company added successfully!');
      setShowAlert(true);
      setFormData({
        companyName: '',
        companyDescription: '',
        contactNumber: '',
        contactEmail: '',
        logo: '',
        state: '',
        city: '',
      });
    } catch (error) {
      setError('Error: Data is not added. Please check your input again.');
      setShowAlert(true);
    }
  };

  return (
    <>
    <div style={{ display:"flex",width:"80%",margin:"auto",alignItems:"left"}}>
    <Link to="/" className="btn btn-primary mt-2 ">
    Home-page
  </Link>
  </div>
    <div className="form-container">
      {showAlert && (
        <Alert
          variant={success ? 'success' : 'danger'}
          onClose={() => setShowAlert(false)}
          dismissible
          className="mt-3"
        >
          {success || error}
        </Alert>
      )}
      <h2>Add Company</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="companyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="companyDescription">
          <Form.Label>Company Description</Form.Label>
          <Form.Control
            as="textarea"
            name="companyDescription"
            placeholder="Enter company description"
            value={formData.companyDescription}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="contactEmail"
            placeholder="Enter email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="logo">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="text"
            name="logo"
            placeholder="Enter logo URL"
            value={formData.logo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='submit'>
          Submit
        </Button>
      </Form>
    </div>
    </>
  );
};

export default CompanyForm;
