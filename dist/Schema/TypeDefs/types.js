"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = exports.TaskType = void 0;
const graphql_1 = require("graphql");
const tags_1 = __importDefault(require("../../models/tags"));
exports.TaskType = new graphql_1.GraphQLObjectType({
    name: "Task",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        description: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLBoolean },
        tags: {
            type: new graphql_1.GraphQLList(exports.TagType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const tagIds = parent.tags;
                        // On récupère les ids des tags de la tâche via mongoDB
                        const tags = yield tags_1.default.find({ _id: { $in: tagIds } });
                        return tags;
                    }
                    catch (error) {
                        throw new Error(`Error getting tags associate to the task : ${error.message}`);
                    }
                });
            },
        },
    }),
});
exports.TagType = new graphql_1.GraphQLObjectType({
    name: "Tag",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        colorCode: { type: graphql_1.GraphQLString },
    }),
});
