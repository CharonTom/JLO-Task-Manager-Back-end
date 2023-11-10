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
describe("CRUD testing", () => {
    it("should successfully create a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = {
            description: "Testing create",
        };
        const createResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/graphql")
            .send({
            query: `mutation {
            createTask (description:"${newTask.description}") {
              description
            }
          }`,
        });
        // Vérifiez le statut de la réponse
        expect(createResponse.status).toBe(200);
        // Vérifiez si la tâche a été créée avec succès en fesant matcher avec la réponse
        const createdTask = createResponse.body.data.createTask;
        expect(createdTask.description).toBe(newTask.description);
    }));
    //----------------- Test de mise à jour de la tâche---------------------------
    it("should successfully create and update a task", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = yield tasks_1.default.create({
            description: "Testing update",
        });
        const updatedDesc = "updated";
        const updateResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/graphql")
            .send({
            query: `mutation {
            updateTask(id: "${newTask._id}", description: "${updatedDesc}") {
              _id
              description
            }
          }`,
        });
        expect(updateResponse.status).toBe(200);
        // Vérifiez si la tâche a été mise à jour avec succès en matchant avec la réponse
        const updatedTask = updateResponse.body.data.updateTask;
        expect(updatedTask.description).toBe(updatedDesc);
    }));
});
