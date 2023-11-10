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
exports.UPDATE_TASK = exports.DELETE_TRUE_TASKS = exports.DELETE_TASK = exports.CREATE_TASK = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../TypeDefs/types");
const tasks_1 = __importDefault(require("../../models/tasks"));
const tags_1 = __importDefault(require("../../models/tags"));
//--------------- Create a new task ----------------------
exports.CREATE_TASK = {
    type: types_1.TaskType,
    args: {
        description: { type: graphql_1.GraphQLString },
        tags: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, tags } = args;
                const newTask = new tasks_1.default({
                    description,
                    tags,
                });
                // On sauvegarde la tâche dans la BDD
                const savedTask = yield newTask.save();
                return savedTask;
            }
            catch (error) {
                throw new Error(`Error creating task : ${error.message}`);
            }
        });
    },
};
//----------------------- Delete -------------------------------------
exports.DELETE_TASK = {
    type: types_1.TaskType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tasks_1.default.findByIdAndDelete(args.id);
                return "The task has been successfully deleted.";
            }
            catch (error) {
                throw new Error(`Error deleting task : ${error.message}`);
            }
        });
    },
};
//----------------------- DELETE ALL TASKS WITH STATUS = TRUE -------------------------------------
exports.DELETE_TRUE_TASKS = {
    type: graphql_1.GraphQLString,
    // Pas besoin d'arguments
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield tasks_1.default.deleteMany({ status: true });
                return "Finished tasks were successfully deleted.";
            }
            catch (error) {
                throw new Error(`Error deleting tasks : ${error.message}`);
            }
        });
    },
};
//----------------------- Update ------------------------------
exports.UPDATE_TASK = {
    type: types_1.TaskType,
    args: {
        id: { type: graphql_1.GraphQLID },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLBoolean },
        tags: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, status, id, tags } = args;
                const task = yield tasks_1.default.findById(id);
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
                    const existingTags = yield tags_1.default.find({ _id: { $in: tags } }); // On vérifie que les ids ont correctement était saisie.
                    if (existingTags.length !== tags.length) {
                        throw new Error("Certains des tags spécifiés n'existent pas.");
                    }
                    task.tags = tags;
                }
                const updatedTask = yield task.save();
                return updatedTask;
            }
            catch (error) {
                throw new Error(`Erreur updating task : ${error.message}`);
            }
        });
    },
};
