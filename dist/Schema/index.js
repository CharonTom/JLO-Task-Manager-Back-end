"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const tasks_1 = require("./Queries/tasks");
const tags_1 = require("./Queries/tags");
const tasks_2 = require("./Mutations/tasks");
const tags_2 = require("./Mutations/tags");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllTasks: tasks_1.GET_ALL_TASKS,
        getOneTask: tasks_1.GET_ONE_TASK,
        getAllTags: tags_1.GET_ALL_TAGS,
        getOneTag: tags_1.GET_ONE_TAG,
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createTask: tasks_2.CREATE_TASK,
        deleteTask: tasks_2.DELETE_TASK,
        updateTask: tasks_2.UPDATE_TASK,
        createTag: tags_2.CREATE_TAG,
        deleteTag: tags_2.DELETE_TAG,
        updateTag: tags_2.UPDATE_TAG,
        deleteTrueTasks: tasks_2.DELETE_TRUE_TASKS,
    },
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
exports.schema = schema;
