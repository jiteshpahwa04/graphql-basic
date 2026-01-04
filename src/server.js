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
];

const users = [
    {
        id: 1,
        name: "Jitesh",
        todos: [todos[0], todos[1]]
    },
    {
        id: 2,
        name: "Alice",
        todos: [todos[2], todos[3]]
    }
]

// gql -> Graphql query language
const typeDefs = gql`
    type Todo {
        id: ID!
        task: String!
        completed: Boolean!
    }

    type User {
        id: ID!
        name: String!
        todos: [Todo]!
    }

    type Query {
        getAllTodos: [Todo],
        getTodo(id: ID!): Todo!,
        getUsers: [User]!
    }
`;

// resolvers -> functions which get executed when a client makes a query/mutation
// query -> read data
// mutation -> write data (create, update, delete) (convention, not mandatory)
const resolvers = {
    Query: {
        getAllTodos: () => {
            return todos;
        },
        getTodo: (_, params) => {
            return todos.find(todo => todo.id == params.id);
        },
        getUsers: () => {
            return users;
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