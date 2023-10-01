import { GraphQLID, GraphQLList } from "graphql";
import { TagType } from "../TypeDefs/types";
import Tag from "../../models/tags";

export const GET_ALL_TAGS = {
  type: new GraphQLList(TagType), // On attend une liste

  resolve() {
    return Tag.find();
  },
};

export const GET_ONE_TAG = {
  type: TagType,
  args: { id: { type: GraphQLID } },

  resolve(parent: any, args: any) {
    return Tag.findById(args.id);
  },
};
