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
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    done();
  });
});
 
let assets: Asset[];
beforeEach(async () => {
  await sequelize.sync({ force: true });
  assets = await Asset.bulkCreate([{ name: "Car", latitude: "2.39494", longitude: "2.39494" }]);
});

describe("Asset Test", () => {
  it("should get all assets", (done) => {
    request(app)
      .get("/assets")
      .end(function (err, res) {
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject([
          { name: "Car", latitude: "2.39494", longitude: "2.39494" },
        ]);
        done();
      });
  });

  it("should create an asset", (done) => {
    request(app)
      .post("/assets")
      .send({
        name: "Bus",
        latitude: "2.4494",
        longitude: "2.39594",
      })
      .end(async (err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
          data: { name: "Bus", latitude: "2.4494", longitude: "2.39594" },
        });
        
        const assets = await Asset.findAll({});
        expect(assets.length).toBe(2);

        done();
      });
  });

  it("should update an asset", (done) => {
    const asset = assets[0];
    const location = {
        latitude: "5.4494",
        longitude: "6.39594",
    };

    request(app)
      .put(`/assets/${asset.id}/location`)
      .send(location)
      .end(async (err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
          data: location,
        });
        
        const asset = await Asset.findAndCountAll({where: location});
        expect(asset.count).toBe(1);
        done();
      });
  });
});
