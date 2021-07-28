import request from "supertest";
import * as http from "http";
import app from "../app";
import env from "../config/env";
import sequelize from "../util/sequelize";
import Asset from "../models/Asset";

let server: http.Server;

beforeAll((done) => {
  const port = env.port;
  server = app.listen(port, (): void => {
    sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});

beforeEach(async () => {
    jest.m
  await Asset.bulkCreate([{ name: "Car", latitude: "2.39494", longitude: "2.39494" }]);
});

describe("Asset Test", () => {
  it("[GET] /assets", (done) => {
    request(app)
      .get("/assets")
      .end(function (err, res) {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject([{ name: "Car", latitude: "2.39494", longitude: "2.39494" }])
        done();
      });
  });
});

afterAll(async () => {
  // await new Promise(resolve => setTimeout(() => resolve(), 100));
});
