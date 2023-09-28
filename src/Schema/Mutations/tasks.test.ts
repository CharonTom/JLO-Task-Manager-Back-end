import request from "supertest";
import app from "../../app";
import TaskModel from "../../models/tasks";

describe("Task API", () => {
  it("should successfully create a task", async () => {
    const newTask = {
      description: "Testing create",
    };

    // Envoie une requête pour créer une tâche
    const createResponse = await request(app)
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
  });

  //----------------- Test de mise à jour de la tâche---------------------------

  it("should successfully create and update a task", async () => {
    const newTask = await TaskModel.create({
      description: "Testing update",
    });
    const updatedDesc = "updated";

    // Envoie une requête pour mettre à jour la tâche
    const updateResponse = await request(app)
      .post("/graphql")
      .send({
        query: `mutation {
            updateTask(id: "${newTask._id}", description: "${updatedDesc}") {
              _id
              description
            }
          }`,
      });
    // Vérifiez le statut de la réponse
    expect(updateResponse.status).toBe(200);

    // Vérifiez si la tâche a été mise à jour avec succès en matchant avec la réponse

    const updatedTask = updateResponse.body.data.updateTask;
    expect(updatedTask.description).toBe(updatedDesc);
  });
});
