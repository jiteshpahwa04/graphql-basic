import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

const todos = [
    {
        id: 1,
        task: "Learn GraphQL",
        completed: false
    },
    {
        id: 2,
        task: "Build a GraphQL API",
        completed: true
    },
    {
        id: 3,
        task: "Profit",
        completed: false
    },
    {
        id: 4,
        task: "Celebrate",
        completed: false
    }
]

// gql -> Graphql query language
const typeDefs = gql`
    type Todo {
        id: ID
        task: String
        completed: Boolean
    }

    type Query {
        getAllTodos: [Todo]
    }
`;

// resolvers -> functions which get executed when a client makes a query/mutation
// query -> read data
// mutation -> write data (create, update, delete) (convention, not mandatory)
const resolvers = {
    Query: {
        getAllTodos: () => {
            return todos;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 GraphQL Server ready at ${url}`);