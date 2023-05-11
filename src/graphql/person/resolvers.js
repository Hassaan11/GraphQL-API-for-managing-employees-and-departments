const { people, departments } = require("../../../DATA");

const resolvers = {
  Person: {
    department: (parent, _) =>
      departments.find((department) => department.id === parent.departmentId),

    // returns manager of user
    manager: (parent, _) =>
      people.find((person) => person.id === parent.managerId),

    // employees who report directly to the user
    directReports: (parent, _) =>
      people.filter((person) => person.managerId === parent.id),
  },
  Query: {
    // returns person based on id
    person: (_, { id }) => people?.find((person) => person?.id === id),

    // search person based on first name or job title
    searchPerson: (_, { searchValue }) =>
      people?.filter(
        (person) =>
          person.firstName === searchValue || person.jobTitle === searchValue
      ),

    // returns hierarchy of the user
    getUserHierarchy: (parent, { userId }) =>
      people.find((person) => person.id === userId),

    // returns all the employees
    people: () => people,
  },

  Mutation: {
    updatePerson: (_, { id, ...args }) => {
      const personIndex = people?.findIndex((person) => person.id === id);
      if (personIndex === -1) {
        throw new Error("Person not found");
      }
      const updatedPerson = { ...people[personIndex], ...args };
      people[personIndex] = updatedPerson;
      return updatedPerson;
    },
  },
};

module.exports = resolvers;
