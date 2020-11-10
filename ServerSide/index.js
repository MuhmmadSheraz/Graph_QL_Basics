// Import Required Files
const { ApolloServer, gql } = require("apollo-server");
//JSON FILE
let studentJSON = [
  {
    id: 1,
    name: "Ali",
    email: "ali@gmail.com",
    age: 21,
  },
  {
    id: 2,
    name: "Mohsin",
    email: "mohsin@gmail.com",
    age: 21,
  },
  {
    id: 3,
    name: "Aamir",
    email: "aamir@gmail.com",
    age: 21,
  },
];

//Resolver
const resolvers = {
  Query: {
    studentsData: () => studentJSON,
  },
  Mutation: {
    addStudent: (e, { input }) => {
      console.log("E====>", e);
      console.log("Input====>", input);
      studentJSON.push({
        name: input.name,
        id: input.id,
        age: input.age,
        email: input.email,
      });
      return {
        name: input.name,
        id: input.id,
        age: input.age,
        email: input.email,
      };
    },
  },
};

//Types
const typeDefs = gql`
  type StudentType {
    id: Int
    name: String
    email: String
    age: Int
  }
  type Query {
    studentsData: [StudentType]
  }
  input InputStudent {
    id: Int
    name: String
    email: String
    age: Int
  }
  type Mutation {
    addStudent(input: InputStudent): StudentType
  }
`;

//Listner
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
