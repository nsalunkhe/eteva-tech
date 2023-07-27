# eteva-tech

Frontend Deployed URL : https://eteva-tech-frontend.onrender.com/

Backend Deployed URL : https://backend-eteva-tech.onrender.com/companies

# Company List Management App

This is a web application that allows users to manage a list of companies. The application provides features to view, add, edit, and delete company entries. Each company entry consists of details such as company name, description, contact information, and location.

## Understanding of the Problem

The problem is to build a company list management app that enables users to perform CRUD (Create, Read, Update, Delete) operations on a list of companies. The app should have a user-friendly interface, allowing users to view all companies, search for specific companies, add new companies, edit existing company details, and delete companies from the list.

## Approach

To solve the problem, I used the following approach:

1. **Frontend Development:** I built the application's frontend using React, a popular JavaScript library for building user interfaces. The app's user interface includes a company list view, search functionality, pagination, and forms for adding/editing company details.

2. **Backend Development:** For the backend, I set up a RESTful API using Node.js and Express. This API handles requests from the frontend to perform CRUD operations on the company data. I used MongoDB as the database to store the company information.

3. **Redux State Management:** I implemented Redux, a state management library to manage the application's state and data flow. Redux allows us to maintain a global state that can be accessed by different components, making it easier to share and manage data across the app.

4. **Redux Thunk Middleware:** I utilized Redux Thunk Middleware to handle asynchronous actions, such as fetching data from the backend API. This enables us to dispatch actions asynchronously and handle the loading and error states while fetching data.

5. **Styling:** I applied custom CSS and Bootstrap to style the frontend and ensure a clean and responsive design. Bootstrap components were used for styling buttons, forms, and tables.

6. **Deployment:** The frontend and backend of the application are deployed on render. I used environment variables to manage sensitive information and API URLs.

7. **Functionality and User Experience:** I focused on creating an intuitive user experience by implementing features like search functionality, pagination for easy navigation, and user alerts for successful or failed actions (e.g., adding/editing/deleting companies).

Overall, the approach aimed to create a well-organized, user-friendly, and functional company list management app with both frontend and backend components seamlessly integrated.

#Some Screenshots of the website 
 1. List page

  ![Listpage](https://github.com/nsalunkhe/eteva-tech/assets/101391587/931fa2a4-6075-42f9-bad4-96bef0519e33)


2. Form page

  ![Form](https://github.com/nsalunkhe/eteva-tech/assets/101391587/c0e3df8f-ebfc-4268-9ecb-27b6ded28076)

     


 
