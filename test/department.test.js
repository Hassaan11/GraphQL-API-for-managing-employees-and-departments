const { makeExecutableSchema } = require("@graphql-tools/schema");
const { expect } = require("@jest/globals");
const { graphql } = require("graphql");
const resolvers = require("../src/graphql/person/resolvers");
const typeDefs = require("../src/graphql/person/typeDefs");
const departmentTypeDefs = require("../src/graphql/department/typeDefs");
const departmentResolvers = require("../src/graphql/department/resolvers");
const { departments } = require("../DATA.json");

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, departmentTypeDefs],
  resolvers: [resolvers, departmentResolvers],
});

describe("department GraphQL API", () => {
  test("Get All departments query should return an array of departments", async () => {
    const query = `
      query {
        departments {
          id
          name
        }
      }
    `;

    const result = await graphql(schema, query, null, { departments });
    expect(result?.data?.departments.length).toEqual(departments.length);
  });

  test("getDepartmentById query should return a single department", async () => {
    const query = `
      query {
        department(id: "920a774e-617a-4a5b-82ea-8205c18eef75") {
          id
          name
        }
      }
    `;

    const expected = {
      data: {
        department: {
          id: "920a774e-617a-4a5b-82ea-8205c18eef75",
          name: "Engineering",
        },
      },
    };

    const result = await graphql(schema, query, null, {});

    expect(result?.data?.department).toEqual(expected?.data?.department);
  });
});
