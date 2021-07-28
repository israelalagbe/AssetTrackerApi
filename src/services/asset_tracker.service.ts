import AssetService from "./asset.service";
import * as ws from "ws";
import { v4 as uuidv4 } from "uuid";
import { Client, Location } from "../types";
import eventEmitter from "../util/event_emitter";
import Asset from "../models/Asset";

class AssetTrackerService {
  public clients: Client[] = [];

  constructor(private assetService: AssetService) {
    this.setup();
  }

  async setup() {
    eventEmitter.on("location_change", this.broadcastLocationChange);
    eventEmitter.on("location_change", this.proximityCheck);
  }

  async track(assetId: string, wsClient: ws, clientLocation: Location) {
    const asset = await this.assetService.findAssetById(assetId);

    wsClient.send(
      JSON.stringify({
        event: "location_update",
        data: {
          latitude: asset.latitude,
          longitude: asset.longitude,
        },
      })
    );

    const client: Client = {
      id: uuidv4(),
      wsClient,
      assetId,
      location: clientLocation,
      lastBroadcast: Date.now(),
    };
    
    this.clients.push(client);

    this.proximityCheck(asset)

    wsClient.on("close", () => this.removeClient(client.id));
  }

  broadcastLocationChange = async (asset: Asset) => {

    const clients = this.clients.filter((client) => client.assetId === asset.id);
    for (const client of clients) {
      const throttleTimeout = 5000; // 5 seconds

      //Check if a broadcast has been sent within the last 5 seconds
      if (Date.now() - client.lastBroadcast < throttleTimeout) {
        return;
      }

      client.wsClient.send(
        JSON.stringify({
          event: "location_update",
          data: {
            latitude: asset.latitude,
            longitude: asset.longitude,
          },
        })
      );
      client.lastBroadcast = Date.now();
    }
  };
  proximityCheck = async (asset: Asset) => {
    const clients = this.clients.filter((client) => client.assetId === asset.id);

    for (const client of clients) {
      const distance = this.distance(client.location, asset);
      //Check for asset within 10 metres of client, having distance in multiple of 10
      if(distance <= 100 && distance % 10 === 0){
        //Send special proximity message to client
        client.wsClient.send(
          JSON.stringify({
            event: "proximity",
            data: {
              message: `The ${asset.name} is ${distance} meter(s) away`,
              distance
            },
          })
        );
      }
    }
  };

  async removeClient(clientId: string) {
    this.clients = this.clients.filter((client) => client.id !== clientId);
  }

  /**
   * Calculates distance in meter using Haversine formula
   */
  distance(origin: Location, dest: Location) {
    const originLatitude = Number(origin.latitude);
    const originLongitude = Number(origin.longitude);

    const destLatitude = Number(dest.latitude);
    const destLongitude = Number(dest.longitude);

    //using Haversine formula, calculate distance
    var p = Math.PI / 180;
    var cos = Math.cos;
    var a =
      0.5 -
      cos((destLatitude - originLatitude) * p) / 2 +
      (cos(originLatitude * p) *
        cos(destLatitude * p) *
        (1 - cos((destLongitude - originLongitude) * p))) /
        2;

    const distanceInKm = 12742 * Math.asin(Math.sqrt(a));
    return Math.floor(distanceInKm * 1000);
  }
}

export default AssetTrackerService;
