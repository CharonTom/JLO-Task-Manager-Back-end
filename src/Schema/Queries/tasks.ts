import { GraphQLList } from "graphql";
import { TaskType } from "../TypeDefs/types";
import Task from "../../models/tasks"; // Importez votre modèle de tâche MongoDB

export const GET_ALL_TASKS = {
  type: new GraphQLList(TaskType),
  resolve() {
    return Task.find();
  },
};
