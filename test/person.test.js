const { makeExecutableSchema } = require("@graphql-tools/schema");
const { expect } = require("@jest/globals");
const { graphql } = require("graphql");
const resolvers = require("../src/graphql/person/resolvers");
const typeDefs = require("../src/graphql/person/typeDefs");
const departmentTypeDefs = require("../src/graphql/department/typeDefs");
const departmentResolvers = require("../src/graphql/department/resolvers");
const { people } = require("../DATA.json");

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, departmentTypeDefs],
  resolvers: [resolvers, departmentResolvers],
});

describe("Person GraphQL API", () => {
  test("Get All Users query should return an array of users", async () => {
    const query = `
      query {
        people {
          id
          firstName
          lastName
          jobTitle
          departmentId
          managerId
        }
      }
    `;

    const result = await graphql(schema, query, null, { people });
    expect(result?.data?.people.length).toEqual(people.length);
  });

  test("getUserById query should return a single user", async () => {
    const query = `
      query {
        person(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
          id
          firstName
          lastName
          jobTitle
          departmentId
          managerId
        }
      }
    `;

    const expected = {
      data: {
        person: {
          id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
          firstName: "Orval",
          lastName: "Hauck",
          jobTitle: "CEO",
          departmentId: "2b9edccb-41fc-4fc5-b832-ac86a034a877",
          managerId: null,
        },
      },
    };

    const result = await graphql(schema, query, null, {});

    expect(result?.data?.person).toEqual(expected?.data?.person);
  });

  test("searchUserByNameorJobTitle query should return a single user", async () => {
    const query = `
      query {
        searchPerson(searchValue: "CEO") {
          id
          firstName
          lastName
          jobTitle
          departmentId
          managerId
        }
      }
    `;

    const expected = {
      data: {
        searchPerson: [
          {
            id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
            firstName: "Orval",
            lastName: "Hauck",
            jobTitle: "CEO",
            departmentId: "2b9edccb-41fc-4fc5-b832-ac86a034a877",
            managerId: null,
          },
        ],
      },
    };

    const result = await graphql(schema, query, null, {});

    expect(result?.data?.searchPerson).toEqual(expected?.data?.searchPerson);
  });

  test("get User hierarchy query should return a single user", async () => {
    const query = `
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
    `;

    const expected = {
      data: {
        getUserHierarchy: {
          id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
          firstName: "Orval",
          lastName: "Hauck",
          jobTitle: "CEO",
          department: {
            id: "2b9edccb-41fc-4fc5-b832-ac86a034a877",
            name: "Management",
            teamMembers: [
              {
                id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
                firstName: "Orval",
                lastName: "Hauck",
                jobTitle: "CEO",
              },
              {
                id: "6a56a153-05d6-4ce3-b6ec-c629a3815d81",
                firstName: "Kody",
                lastName: "Conn",
                jobTitle: "Investor Data Associate",
              },
              {
                id: "e499e3fb-d0d0-442b-ad6c-c44b4eb9038a",
                firstName: "Myrl",
                lastName: "Sanford",
                jobTitle: "Dynamic Configuration Orchestrator",
              },
              {
                id: "9d24311a-01c6-47a6-9e68-61bb363a7af2",
                firstName: "Megane",
                lastName: "Moore",
                jobTitle: "Regional Program Engineer",
              },
              {
                id: "ffc3f5f4-3494-4f3e-b64a-4c5058d0ea61",
                firstName: "Mateo",
                lastName: "Schowalter",
                jobTitle: "Principal Web Manager",
              },
              {
                id: "cca3a445-0258-4b9f-963f-6ca495af0578",
                firstName: "Hester",
                lastName: "Hickle",
                jobTitle: "Global Directives Manager",
              },
              {
                id: "665f6462-3a63-4914-b730-a56f66b9d445",
                firstName: "Granville",
                lastName: "McGlynn",
                jobTitle: "Principal Accounts Producer",
              },
              {
                id: "9eb5b46c-866f-4154-9c02-0278ba08167c",
                firstName: "Luis",
                lastName: "Gottlieb",
                jobTitle: "Dynamic Accounts Executive",
              },
              {
                id: "683287b8-4993-4c05-9dc0-0ae66844737c",
                firstName: "Dorcas",
                lastName: "Weber",
                jobTitle: "National Integration Director",
              },
              {
                id: "1f6c76a0-2954-433d-a1de-9f4e5f791014",
                firstName: "Noble",
                lastName: "Schneider",
                jobTitle: "District Paradigm Strategist",
              },
              {
                id: "47d59eee-fcf2-437a-997e-2c1c3c2ce12f",
                firstName: "Freddy",
                lastName: "Bradtke",
                jobTitle: "Principal Research Supervisor",
              },
              {
                id: "5dc61ac9-d0f3-456b-8c5d-2bdfbeee95c3",
                firstName: "Zoie",
                lastName: "Lesch",
                jobTitle: "Corporate Identity Producer",
              },
            ],
          },
          manager: null,
          directReports: [
            {
              id: "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d",
              firstName: "Asia",
              lastName: "Streich",
              jobTitle: "Dynamic Branding Orchestrator",
            },
            {
              id: "1da7452e-dfe6-4a23-90d5-c926c5cc38d4",
              firstName: "Tremaine",
              lastName: "Dicki",
              jobTitle: "Investor Branding Associate",
            },
            {
              id: "d6a7b78e-7a58-43a0-a7a6-03ceebd5d750",
              firstName: "Christ",
              lastName: "Pfannerstill",
              jobTitle: "Chief Implementation Director",
            },
            {
              id: "3a29651c-d050-4c68-886e-542137132a70",
              firstName: "Boyd",
              lastName: "Gibson",
              jobTitle: "Direct Marketing Designer",
            },
          ],
        },
      },
    };

    const result = await graphql(schema, query, null, {});

    expect(result?.data?.getUserHierarchy).toEqual(
      expected?.data?.getUserHierarchy
    );
  });

  test("update user based on id", async () => {
    const mutation = `
      mutation {
        updatePerson(
          id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef"
          firstName: "Hassaan"
        ) {
          id
          firstName
        }
      }
    `;

    const result = await graphql(schema, mutation, null, {});
    console.log("result", result);
    expect(result?.data?.updatePerson).toEqual({
      id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef",
      firstName: "Hassaan",
    });
  });
});
