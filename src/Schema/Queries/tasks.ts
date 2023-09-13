import { GraphQLID, GraphQLList } from "graphql";
import { TaskType } from "../TypeDefs/types";
import Task from "../../models/tasks";

export const GET_ALL_TASKS = {
  type: new GraphQLList(TaskType),

  resolve() {
    return Task.find();
  },
};

export const GET_ONE_TASK = {
  type: TaskType,
  args: { id: { type: GraphQLID } },

  resolve(parent: any, args: any) {
    return Task.findById(args.id);
  },
};
