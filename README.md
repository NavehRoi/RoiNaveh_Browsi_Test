# Browsi Roi Naveh Web Application

## Project Overview

This project is a full-stack web application designed for Browsi admin-level users to manage publishers, domains, and their monetization strategies. The frontend is built using Angular, while the backend is developed with Node.js. The application allows users to add, edit, and validate domains, ensuring no duplicate domains exist across different publishers.

## Features

### Frontend (Angular)

1. **Publisher Management**:
   - **Add Publisher**: Users can add new publishers to the list. 
   - **Add Domain**: Users can add new domains to an existing publisher. 
   - **Edit Domain**: Existing domains can be edited. 

2. **Integration with Backend**:
   - The Angular frontend is fully integrated with a Node.js backend via RESTful APIs, allowing for seamless data management.

### Backend (Node.js)

1. **RESTful API**:
   - **Get All Publishers**: Retrieves a list of all publishers and their associated domains.
   - **Add Publisher**: Adds a new publisher to the list.
   - **Get All Domains**: Retrieves a list of all domains across all publishers.
   - **Create Domain**: Adds a new domain to a specific publisher.
   - **Update Domain**: Updates the details of a specific domain.
   - **Delete Domain**: Deletes a specific domain from a publisher.

2. **Data Validation**:
   - The backend ensures that no duplicate domains exist across different publishers.
   - All API endpoints include appropriate error handling and validation to ensure data integrity.


## Code Structure
- **Angular Components**:
- `PublishersContainerComponent`: Manages the list of publishers and their domains.
- `DomainCardComponent`: Displays and manages individual domains within a publisher.
- `EditDomainComponent`: Handles the logic for adding and editing domains.

- **Node.js Server**:
- `api.js`: Contains all the API routes for managing publishers and domains.
- `server.js`: Initializes the server and sets up middleware and routing.

### Steps to Run the Application

**Backend Setup**:
- Navigate to the `backend` directory:
  
- Start the Node.js server:
  
- The server will run on `http://localhost:3000`.

3. **Frontend Setup**:

- Start the Angular application:
 
- The application will be available at `http://localhost:4200`.
