import request from "supertest";
import app from "../../index";

describe("Task API", () => {
  let taskId: string;

  it("should successfully create and update a task", async () => {
    const newTask = {
      description: "New task test",
    };

    // Envoie une requête pour créer une tâche
    const createResponse = await request(app)
      .post("/graphql")
      .send({
        query: `mutation {
            createTask (description:"${newTask.description}") {
              _id
              description
            }
          }`,
      });

    // Vérifiez le statut de la réponse
    expect(createResponse.status).toBe(200);

    // Vérifiez si la tâche a été créée avec succès en fesant matcher avec la réponse
    const createdTask = createResponse.body.data.createTask;
    expect(createdTask.description).toBe(newTask.description);

    // On stock l'ID de la tâche créée pour l'Update
    taskId = createdTask._id;

    //----------------- Test de mise à jour de la tâche---------------------------

    const updatedDescription = "Updated task description";

    // Envoie une requête pour mettre à jour la tâche
    const updateResponse = await request(app)
      .post("/graphql")
      .send({
        query: `mutation {
            updateTask(id: "${taskId}", description: "${updatedDescription}") {
              _id
              description
            }
          }`,
      });

    // Vérifiez le statut de la réponse
    expect(updateResponse.status).toBe(200);

    // Vérifiez si la tâche a été mise à jour avec succès en matchant avec la réponse
    const updatedTask = updateResponse.body.data.updateTask;
    expect(updatedTask.description).toBe(updatedDescription);
  });

  it("should successfully delete the created task", async () => {
    // Supprimez la tâche créée
    const deleteResponse = await request(app)
      .post("/graphql")
      .send({
        query: `mutation {
            deleteTask (id: "${taskId}") {
              _id
            }
          }`,
      });

    // Vérifiez le statut de la réponse de suppression
    expect(deleteResponse.status).toBe(200);
  });
});
