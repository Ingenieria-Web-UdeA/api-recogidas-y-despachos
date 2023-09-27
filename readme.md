# Recogidas y Despachos API

This repository contains the backend API for the "Recogidas y Despachos" service. It's built using AWS CDK, AWS Lambda, AWS API Gateway, and Prisma with a PostgreSQL database.

## Overview

The API provides CRUD operations for the following models:

- Users
- Shipments
- Collections
- Lots

## Setup

### Prerequisites

- AWS CLI
- AWS CDK
- Docker
- Node.js
- Prisma CLI

### Deployment

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:

   ```bash
   cd [repository-name]
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Deploy the stack using CDK:
   ```bash
   cdk deploy
   ```

## API Endpoints

The API is structured as a RESTful service with the following endpoints:

- `/users`: Retrieve all users or create a new user.
- `/users/{userId}`: Retrieve, update, or delete a specific user by ID.
- `/shipments`: Retrieve all shipments or create a new shipment.
- `/shipments/{shipmentId}`: Retrieve or delete a specific shipment by ID.
- `/collections`: Retrieve all collections or create a new collection.
- `/collections/{collectionId}`: Retrieve or delete a specific collection by ID.
- `/lots`: Retrieve all lots or create a new lot.
- `/lots/{lotId}`: Retrieve or delete a specific lot by ID.

## Documentation

The API documentation is available as a Swagger/OpenAPI definition. You can access the [Swagger UI here](https://d2tb9y3eoy4nz1.cloudfront.net/) or use the API Gateway URL to access the OpenAPI definition directly.

## Contributing

If you'd like to contribute to this project, please fork the repository, create a feature branch, and submit a pull request.


