import { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import { TaskType } from "../TypeDefs/types";
import TaskModel from "../../models/tasks";
import TagModel from "../../models/tags";

//--------------- Create a new task ----------------------

export const CREATE_TASK = {
  type: TaskType,
  args: {
    description: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLID) },
  },
  async resolve(parent: any, args: any) {
    try {
      const { description, tags } = args;

      const newTask = new TaskModel({
        description,
        tags,
      });

      // On sauvegarde la tâche dans la BDD
      const savedTask = await newTask.save();
      return savedTask;
    } catch (error: any) {
      throw new Error(`Error creating task : ${error.message}`);
    }
  },
};

//----------------------- Delete -------------------------------------

export const DELETE_TASK = {
  type: TaskType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    try {
      await TaskModel.findByIdAndDelete(args.id);

      return "The task has been successfully deleted.";
    } catch (error: any) {
      throw new Error(`Error deleting task : ${error.message}`);
    }
  },
};

//----------------------- DELETE ALL TASKS WITH STATUS = TRUE -------------------------------------

export const DELETE_TRUE_TASKS = {
  type: GraphQLString,
  // Pas besoin d'arguments
  async resolve(parent: any, args: any) {
    try {
      await TaskModel.deleteMany({ status: true });

      return "Finished tasks were successfully deleted.";
    } catch (error: any) {
      throw new Error(`Error deleting tasks : ${error.message}`);
    }
  },
};

//----------------------- Update ------------------------------

export const UPDATE_TASK = {
  type: TaskType,
  args: {
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLID) },
  },
  async resolve(parent: any, args: any) {
    try {
      const { description, status, id, tags } = args;

      const task = await TaskModel.findById(id);

      if (!task) {
        throw new Error("Task is not found");
      }
      if (description !== undefined) {
        task.description = description;
      }
      if (status !== undefined) {
        task.status = status;
      }
      if (tags !== undefined) {
        const existingTags = await TagModel.find({ _id: { $in: tags } }); // On vérifie que les ids ont correctement était saisie.

        if (existingTags.length !== tags.length) {
          throw new Error("Certains des tags spécifiés n'existent pas.");
        }

        task.tags = tags;
      }

      const updatedTask = await task.save();

      return updatedTask;
    } catch (error: any) {
      throw new Error(`Erreur updating task : ${error.message}`);
    }
  },
};
