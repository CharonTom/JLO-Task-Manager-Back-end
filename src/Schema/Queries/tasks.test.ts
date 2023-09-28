import request from "supertest";
import app from "../../app";
import TaskModel from "../../models/tasks";

describe("Fetching data testing", () => {
  beforeEach(async () => {
    await TaskModel.deleteMany({});
  });

  it("shoud get all tasks successfully", async () => {
    await TaskModel.insertMany([
      { description: "Tâche 1" },
      { description: "Tâche 2" },
    ]);

    const response = await request(app)
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
  });

  it("shoud get an empty array if no data in DB", async () => {
    const response = await request(app)
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
  });
});
