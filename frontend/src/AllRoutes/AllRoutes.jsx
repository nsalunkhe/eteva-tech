import React from 'react'
import { Route, Routes } from "react-router-dom";
import CompanyForm from '../Pages/CompanyForm'
import CompanyList from '../Pages/CompanyList';
import EditCompanyForm from '../Pages/EditCompanyForm';

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<CompanyList/>}></Route>
        <Route path="/form" element={<CompanyForm/>}></Route>
        <Route path="/edit-company/:id" element={<EditCompanyForm />} />
    </Routes>

    </>
  )
}

export default AllRoutes