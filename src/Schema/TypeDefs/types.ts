import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

export const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLBoolean },
  }),
});

export const TaskGroupType = new GraphQLObjectType({
  name: "TaskGroup",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    colorCode: { type: GraphQLString },
    tasks: { type: new GraphQLList(TaskType) },
  }),
});
