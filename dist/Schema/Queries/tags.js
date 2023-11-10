"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ONE_TAG = exports.GET_ALL_TAGS = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../TypeDefs/types");
const tags_1 = __importDefault(require("../../models/tags"));
exports.GET_ALL_TAGS = {
    type: new graphql_1.GraphQLList(types_1.TagType),
    resolve() {
        return tags_1.default.find();
    },
};
exports.GET_ONE_TAG = {
    type: types_1.TagType,
    args: { id: { type: graphql_1.GraphQLID } },
    resolve(parent, args) {
        return tags_1.default.findById(args.id);
    },
};
