import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCompanies, deleteCompany, updateCompany } from '../Redux/actions/CompanyActions';
import { Table, Button, Alert, Container, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyList.css'; // Import custom CSS file

const CompanyList = () => {
  const dispatch = useDispatch();
  const { loading, error, companies } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  const [editingCompany, setEditingCompany] = useState(null);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('companyName');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleEdit = (company) => {
    setEditingCompany(company);
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
  };

  const handleUpdate = (id, updatedCompany) => {
    dispatch(updateCompany(id, updatedCompany));
    setEditingCompany(null);
    setShowUpdateAlert(true);
    setShowDeleteAlert(false); // Make sure delete alert is hidden
    // window.location.reload(); // Reload the page after updating
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      dispatch(deleteCompany(id));
      setShowDeleteAlert(true);
      setShowUpdateAlert(false); // Make sure update alert is hidden
      // window.location.reload(); // Reload the page after deleting
    }
  };

  useEffect(() => {
    let alertTimer;
    if (showUpdateAlert || showDeleteAlert) {
      alertTimer = setTimeout(() => {
        setShowUpdateAlert(false);
        setShowDeleteAlert(false);
      }, 2000); // 2000 milliseconds = 2 seconds
    }
    return () => {
      clearTimeout(alertTimer);
    };
  }, [showUpdateAlert, showDeleteAlert]);

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedCompanies = filteredCompanies.sort((a, b) => {
    const sortOrder = sortDirection === 'asc' ? 1 : -1;
    return a[sortColumn] > b[sortColumn] ? sortOrder : -sortOrder;
  });
  const currentCompanies = sortedCompanies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

  const handleSortChange = (e) => {
    setSortColumn(e.target.value);
  };

  const handleToggleSortDirection = () => {
    setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="company-list-container">
      {showUpdateAlert && (
        <Alert variant="success" onClose={() => setShowUpdateAlert(false)} dismissible className="mt-3">
          Company updated successfully!
        </Alert>
      )}

      {showDeleteAlert && (
        <Alert variant="danger" onClose={() => setShowDeleteAlert(false)} dismissible className="mt-3">
          Company deleted successfully!
        </Alert>
      )}

      <Container fluid className="d-flex justify-content-around align-items-center m-auto">
        <div className="search-box">
          <Form.Control
            type="text"
            placeholder="Search by Company Name"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ textAlign: "center"}}
          />
        </div>
        <Link to="/form" className="btn btn-primary ml-3">
          Add Company
        </Link>
        <div className="sort-dropdown ml-3 mt-3">
          <Form.Control as="select" value={sortColumn} onChange={handleSortChange}>
            <option value="companyName">Company Name</option>
            {/* Add more options for sorting */}
          </Form.Control>
          <Button variant="outline-primary" onClick={handleToggleSortDirection}>
            {sortDirection === 'asc' ? '▲' : '▼'}
          </Button>
        </div>
      </Container>
      <h2>Company List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Company Name</th>
              <th>Company Description</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>State</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company) =>
              editingCompany && editingCompany._id === company._id ? (
                <tr key={company._id}>
                  <td>
                    <Image src={company.logo} roundedCircle width={40} height={40} />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCompany.companyName}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, companyName: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      className="form-control"
                      value={editingCompany.companyDescription}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, companyDescription: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCompany.contactNumber}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, contactNumber: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className="form-control"
                      value={editingCompany.contactEmail}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, contactEmail: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCompany.state}
                      onChange={(e) => setEditingCompany({ ...editingCompany, state: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCompany.city}
                      onChange={(e) => setEditingCompany({ ...editingCompany, city: e.target.value })}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={() => handleUpdate(editingCompany._id, editingCompany)}>
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                  </td>
                </tr>
              ) : (
                <tr key={company._id}>
                  <td>
                    <Image src={company.logo} roundedCircle width={40} height={40} />
                  </td>
                  <td>{company.companyName}</td>
                  <td>{company.companyDescription}</td>
                  <td>{company.contactNumber}</td>
                  <td>{company.contactEmail}</td>
                  <td>{company.state}</td>
                  <td>{company.city}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleEdit(company)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(company._id)}>Delete</Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}

      <div className="d-flex justify-content-center">
        <nav aria-label="Company Pagination">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </Button>
            </li>
            {[...Array(totalPages).keys()].map((index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <Button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CompanyList;
