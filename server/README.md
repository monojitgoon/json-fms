# JSON File Management System API - with Node.js, Express, Postgres, Sequelize

Server side which serves endpoints for json file upload (as post) and retrieving the file status(as get)

## Project setup
```
npm install
```

### Run
```
npm start
```
The api runs at http://localhost:4000/api/


# Depenedencies
    "ajv": "^8.11.0",         -- Used for Json schema validation
    "ajv-draft-04": "^1.0.0", -- Used for Json schema validation for draft-04
    "cors": "^2.8.5",        
    "dotenv": "^16.0.0",
    "express": "^4.17.1",
    "fs": "^0.0.1-security",  -- Used for file handling
    "multer": "^1.4.4",       -- Used as middleware for handling multipart/form-data
    "pg": "^8.6.0",           -- Used for postgres
    "sequelize": "^6.6.2"     -- Used as a ORM

# Endpoints

#### Json File Upload
```
POST http://localhost:4000/api/jsonfileupload
```
To post a sample file is available at the parent directory (sample-json-file.json).

#### Json File Upload
```
GET http://localhost:4000/api/filedata
```
To get the list of files and their status.

#### Models
Car 
FileData
Association - one to one

#### Schema Definition for comparing input JSON
```
app/schema/schema.json
```

