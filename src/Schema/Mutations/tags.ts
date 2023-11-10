import { GraphQLString, GraphQLID } from "graphql";
import { TagType } from "../TypeDefs/types";
import TagModel from "../../models/tags";

//--------------- Create a new Tag ---------------------

export const CREATE_TAG = {
  type: TagType,
  args: {
    name: { type: GraphQLString },
    colorCode: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    try {
      const { name, colorCode } = args;

      const newTag = new TagModel({
        name,
        colorCode,
      });

      const savedTag = await newTag.save();
      return savedTag;
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

      return "The tag has been successfully deleted.";
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

      return updatedTag;
    } catch (error: any) {
      throw new Error(`Erreur updating Tag : ${error.message}`);
    }
  },
};
