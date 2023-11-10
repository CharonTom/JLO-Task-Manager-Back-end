"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ONE_TASK = exports.GET_ALL_TASKS = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../TypeDefs/types");
const tasks_1 = __importDefault(require("../../models/tasks"));
exports.GET_ALL_TASKS = {
    type: new graphql_1.GraphQLList(types_1.TaskType),
    resolve() {
        return tasks_1.default.find();
    },
};
exports.GET_ONE_TASK = {
    type: types_1.TaskType,
    args: { id: { type: graphql_1.GraphQLID } },
    resolve(parent, args) {
        return tasks_1.default.findById(args.id);
    },
};
