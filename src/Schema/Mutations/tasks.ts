import { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import { TaskType } from "../TypeDefs/types";
import TaskModel from "../../models/tasks";
import TagModel from "../../models/tags";

//--------------- Create a new task ----------------------

export const CREATE_TASK = {
  type: TaskType,
  args: {
    description: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLID) },
  },
  async resolve(parent: any, args: any) {
    try {
      const { description, status, tags } = args;

      // Using MongoDB's model
      const newTask = new TaskModel({
        description,
        createdAt: new Date(),
        status,
        tags,
      });

      // Saving task in DB
      const savedTask = await newTask.save();

      const successMessage = "The task has been created successfully";
      return { message: successMessage, task: savedTask };
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
        const existingTags = await TagModel.find({ _id: { $in: tags } });

        if (existingTags.length !== tags.length) {
          throw new Error("Certains des tags spécifiés n'existent pas.");
        }

        task.tags = tags; // Associez les nouveaux tags à la tâche
      }

      const updatedTask = await task.save();

      const successMessage = "The task has been successfully updated !";
      return { message: successMessage, task: updatedTask };
    } catch (error: any) {
      throw new Error(`Erreur updating task : ${error.message}`);
    }
  },
};
