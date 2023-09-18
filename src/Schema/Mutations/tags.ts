import { GraphQLString, GraphQLID } from "graphql";
import { TagType } from "../TypeDefs/types";
import TagModel from "../../models/tags";

//--------------- Create a new Tag ----------------------

export const CREATE_TAG = {
  type: TagType,
  args: {
    name: { type: GraphQLString },
    colorCode: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    try {
      const { name, colorCode } = args;

      // On utilise le modèle mongoDB
      const newTag = new TagModel({
        name,
        colorCode,
      });

      // On sauvegarde le tag dans la BDD
      const savedTag = await newTag.save();

      const successMessage = "The Tag has been created successfully";
      return { message: successMessage, Tag: savedTag };
    } catch (error: any) {
      throw new Error(`Error creating Tag : ${error.message}`);
    }
  },
};

//----------------------- Delete ----------------------------------

export const DELETE_TAG = {
  type: TagType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    try {
      const deletedTag = await TagModel.findByIdAndDelete(args.id);

      const successMessage = "The Tag has been successfully deleted";
      return { message: successMessage, Tag: deletedTag };
    } catch (error: any) {
      throw new Error(`Error deleting Tag : ${error.message}`);
    }
  },
};

//----------------------- Update ------------------------------

export const UPDATE_TAG = {
  type: TagType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    colorCode: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    try {
      const { name, colorCode, id } = args;

      const Tag = await TagModel.findById(id);

      if (!Tag) {
        throw new Error("Tag is not found");
      }

      if (name !== undefined) {
        Tag.name = name;
      }
      if (colorCode !== undefined) {
        Tag.colorCode = colorCode;
      }

      const updatedTag = await Tag.save();

      const successMessage = "The Tag has been successfully updated !";
      return { message: successMessage, Tag: updatedTag };
    } catch (error: any) {
      throw new Error(`Erreur updating Tag : ${error.message}`);
    }
  },
};
