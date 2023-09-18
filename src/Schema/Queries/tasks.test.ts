import request from "supertest";
import app from "../../index";

// Je réalise ce test en partant du principe que la base de donnée n'est pas vide.

describe("Get all task", () => {
  it("should get all tasks successfully", async () => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: ` query { getAllTasks {
                  _id
                   }
                }`,
      });

    // Vérifiez le statut de la réponse
    expect(response.status).toBe(200);

    // Vérifiez dans la réponse que des tâches sont présente
    const tasks = response.body.data.getAllTasks;
    expect(tasks.length).toBeGreaterThan(0);
  });
});
