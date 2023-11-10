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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const tasks_1 = __importDefault(require("../../models/tasks"));
describe("Fetching data testing", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield tasks_1.default.deleteMany({});
    }));
    it("shoud get all tasks successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield tasks_1.default.insertMany([
            { description: "Tâche 1" },
            { description: "Tâche 2" },
        ]);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/graphql")
            .send({
            query: `{
          getAllTasks {
            _id
          }
        }`,
        });
        expect(response.status).toBe(200);
        const tasks = response.body.data.getAllTasks;
        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.length).toBeGreaterThan(0);
    }));
    it("shoud get an empty array if no data in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/graphql")
            .send({
            query: `{
          getAllTasks {
            _id
          }
        }`,
        });
        expect(response.status).toBe(200);
        const tasks = response.body.data.getAllTasks;
        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.length).toBe(0);
    }));
});
