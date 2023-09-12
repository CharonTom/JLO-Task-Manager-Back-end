import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_TASKS, GET_ONE_TASK } from "./Queries/tasks";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./Mutations/tasks";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllTasks: GET_ALL_TASKS,
    getOneTask: GET_ONE_TASK,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTask: CREATE_TASK,
    deleteTask: DELETE_TASK,
    updateTask: UPDATE_TASK,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
