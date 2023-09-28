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

      // On sauvegarde le tag dans la BDD
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
      const deletedTask = await TaskModel.findByIdAndDelete(args.id);

      const successMessage = "The task has been successfully deleted";
      return { message: successMessage, task: deletedTask };
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
      const deleteTrueTasks = await TaskModel.deleteMany({ status: true });

      if (deleteTrueTasks.deletedCount > 0) {
        return `${deleteTrueTasks.deletedCount} finished tasks were successfully deleted.`;
      } else {
        return "Nothing to delete.";
      }
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
        // Assurez-vous que les tags existent avant de les associer

        const existingTags = await TagModel.find({ _id: { $in: tags } }); // $in avec MongoDB retournera tous les éléments où l'_id correspond à l'une des valeurs spécifiées dans les tags.

        if (existingTags.length !== tags.length) {
          throw new Error("Certains des tags spécifiés n'existent pas."); // s'assurer que les tags spécifiés correspondent à des tags existants dans la BDD
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
