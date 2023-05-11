const { people, departments } = require("../../../DATA");

const resolvers = {
  Department: {
    manager: (parent, _) =>
      people.find((person) => person.id === parent.managerId),

    // returns all the employees that are in the same department
    teamMembers: (parent, _) =>
      people.filter((person) => person.departmentId === parent.id),
  },
  Query: {
    // returns a department based on id
    department: (_, { id }) =>
      departments?.find((department) => department?.id === id),

    // returns all the departments
    departments: () => departments,
  },
};

module.exports = resolvers;
