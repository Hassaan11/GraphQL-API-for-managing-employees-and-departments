# GraphQL API

This is a GraphQL API for managing employees and departments. It exposes several queries and mutations for retrieving and manipulating data.

## Installation

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Usage/Examples

The API exposes a GraphQL endpoint at /graphql. You can send GraphQL queries and mutations to this endpoint using a tool like GraphiQL or Apollo Server Playground.

### Queries

Get All Users

This query returns the information about all the Users.

```javascript
query {
  people {
    firstName
    lastName
    departmentId
    managerId
    jobTitle
  }
}
```

Get All Departments

This query returns the information about all the departments.

```javascript
query {
  departments {
    id
    name
  }
}
```

Get User based on ID

This query returns the information about a user with the given ID, including their name, job title.

```javascript
query  {
  person(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
    id
    firstName
    lastName
    jobTitle
    managerId
    departmentId
  }
}
```

Get Department based on ID

This query returns the information about a department with the given ID, including department name.

```javascript
query {
  department(id: "920a774e-617a-4a5b-82ea-8205c18eef75") {
    id
    name
  }
}
```

Search User based on First Name or Jobtitle

This query returns the information about a user with the given firstName or jobTitle, including their name, job title.

```javascript
query {
  searchPerson(searchValue: "Principal Paradigm Liaison") {
    firstName
    lastName
    id
  }
}
```

get User Hierarchy

This query returns the information about a user with the given ID, including their name, job title, department, manager, team members and direct reports.

```javascript
query {
    getUserHierarchy(userId: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
        id
        firstName
        lastName
        jobTitle
        department {
            id
            name
            teamMembers {
                id
                firstName
                lastName,
                jobTitle
            }
        }
        manager {
            id
            firstName
            lastName
            jobTitle
        }
        directReports {
            id
            firstName
            lastName
            jobTitle
        }
    }
}
```

### Mutations

Update User

This mutation updates the information about a user with the given ID. You can specify which fields to update by passing them as arguments.

```javascript
mutation {
    updatePerson(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef", firstName: "Testing") {
        firstName,
        lastName,
        id,
        managerId,
        departmentId
    }
}
```

## Testing

```bash
  npm test
```
