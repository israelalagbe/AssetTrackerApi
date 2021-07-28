import request from "supertest";
import * as http from "http";
import WebSocket from "ws";
import app from "../app";
import env from "../config/env";
import sequelize from "../util/sequelize";
import Asset from "../models/Asset";

let server: http.Server;
let socket: WebSocket;
let asset: Asset;
let dateNowSpy: jest.SpyInstance;
let currentDate: number;

beforeAll((done) => {
  const port = env.port;
  server = app.listen(port, async () => {
    await sequelize.sync({ force: true });
    asset = await Asset.create({ name: "Car", latitude: "2.39494", longitude: "2.39494" });

    socket = new WebSocket(
      `ws://localhost:${env.port}/assets/${asset.id}/track?client_latitude=6.5433361&client_longitude=3.379257`
    );
    socket.on("open", () => {
      done();
    });
  });
});

afterAll((done) => {
  server.close(() => {});
  done();
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
  //used to bypass the throttle
  currentDate = Date.now();
});

describe("Asset Tracking Test", () => {
  it("should broadcast asset location immediately after connection", (done) => {
    socket.once("message", (location: string) => {
      expect(JSON.parse(location)).toEqual(
        expect.objectContaining({
          event: "location_update",
          data: {
            longitude: expect.any(String),
            latitude: expect.any(String),
          },
        })
      );
      done();
    });
  });
  it("should broadcast location_update event", (done) => {
    //To bypass the throttle
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => currentDate + 6000);
    socket.once("message", (location: string) => {
      // console.timeEnd('a')
      expect(JSON.parse(location)).toEqual(
        expect.objectContaining({
          event: "location_update",
          data: {
            longitude: expect.any(String),
            latitude: expect.any(String),
          },
        })
      );
      done();
    });

    request(app)
      .put(`/assets/${asset.id}/location`)
      .send({
        latitude: "2.4498",
        longitude: "2.39594",
      })
      .end(() => {});
  });

  it("should broadcast proximity event", (done) => {
    //To bypass the throttle
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => currentDate + 100000);
    const callback = jest.fn();

    socket.on("message", (arg) => callback(JSON.parse(arg.toString())));

    request(app)
      .put(`/assets/${asset.id}/location`)
      .send({
        latitude: "6.5430562",
        longitude: "3.37962",
      })
      .end(() => {
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith({
          event: "proximity",
          data: {
            message: "The Car is 50 meter(s) away",
            distance: 50,
          },
        });
        done();
      });
  });
});
