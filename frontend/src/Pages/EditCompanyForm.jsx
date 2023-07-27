import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Update useHistory to useNavigate
import { getCompanyById, updateCompany } from '../Redux/actions/CompanyActions'; // Ensure correct filename and case for import

const EditCompanyForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Update useHistory to useNavigate
  const { loading, error, company } = useSelector((state) => state.company);
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    contactNumber: '',
    contactEmail: '',
    logo: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    dispatch(getCompanyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && !error && company) {
      setFormData({
        companyName: company.companyName,
        companyDescription: company.companyDescription,
        contactNumber: company.contactNumber,
        contactEmail: company.contactEmail,
        logo: company.logo,
        state: company.state,
        city: company.city,
      });
    }
  }, [loading, error, company]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompany(id, formData, navigate)); // Update useHistory to useNavigate
  };

  return (
    <div>
      <h2>Edit Company</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Your form fields and input elements here */}
          <button type="submit">Update Company</button>
          <Link to="/">Cancel</Link>
        </form>
      )}
    </div>
  );
};

export default EditCompanyForm;
