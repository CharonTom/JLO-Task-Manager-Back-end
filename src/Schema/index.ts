import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_TASKS, GET_ONE_TASK } from "./Queries/tasks";
import { GET_ALL_TAGS, GET_ONE_TAG } from "./Queries/tags";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./Mutations/tasks";
import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from "./Mutations/tags";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllTasks: GET_ALL_TASKS,
    getOneTask: GET_ONE_TASK,
    getAllTags: GET_ALL_TAGS,
    getOneTag: GET_ONE_TAG,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTask: CREATE_TASK,
    deleteTask: DELETE_TASK,
    updateTask: UPDATE_TASK,
    createTag: CREATE_TAG,
    deleteTag: DELETE_TAG,
    updateTag: UPDATE_TAG,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
