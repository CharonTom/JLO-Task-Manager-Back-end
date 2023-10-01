import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import Tag from "../../models/tags";

export const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    _id: { type: GraphQLID },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    tags: {
      type: new GraphQLList(TagType),
      async resolve(parent, args) {
        try {
          const tagIds = parent.tags;

          // On récupère l'info des tags de la tâche via mongoDB
          const tags = await Tag.find({ _id: { $in: tagIds } });

          return tags;
        } catch (error: any) {
          throw new Error(
            `Error getting tags associate to the task : ${error.message}`
          );
        }
      },
    },
  }),
});

export const TagType = new GraphQLObjectType({
  name: "Tag",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    colorCode: { type: GraphQLString },
  }),
});
