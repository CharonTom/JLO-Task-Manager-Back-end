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
exports.UPDATE_TAG = exports.DELETE_TAG = exports.CREATE_TAG = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../TypeDefs/types");
const tags_1 = __importDefault(require("../../models/tags"));
//--------------- Create a new Tag ---------------------
exports.CREATE_TAG = {
    type: types_1.TagType,
    args: {
        name: { type: graphql_1.GraphQLString },
        colorCode: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, colorCode } = args;
                const newTag = new tags_1.default({
                    name,
                    colorCode,
                });
                const savedTag = yield newTag.save();
                return savedTag;
            }
            catch (error) {
                throw new Error(`Error creating Tag : ${error.message}`);
            }
        });
    },
};
//----------------------- Delete ----------------------------------
exports.DELETE_TAG = {
    type: types_1.TagType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTag = yield tags_1.default.findByIdAndDelete(args.id);
                return "The tag has been successfully deleted.";
            }
            catch (error) {
                throw new Error(`Error deleting Tag : ${error.message}`);
            }
        });
    },
};
//----------------------- Update ------------------------------
exports.UPDATE_TAG = {
    type: types_1.TagType,
    args: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        colorCode: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, colorCode, id } = args;
                const Tag = yield tags_1.default.findById(id);
                if (!Tag) {
                    throw new Error("Tag is not found");
                }
                if (name !== undefined) {
                    Tag.name = name;
                }
                if (colorCode !== undefined) {
                    Tag.colorCode = colorCode;
                }
                const updatedTag = yield Tag.save();
                return updatedTag;
            }
            catch (error) {
                throw new Error(`Erreur updating Tag : ${error.message}`);
            }
        });
    },
};
