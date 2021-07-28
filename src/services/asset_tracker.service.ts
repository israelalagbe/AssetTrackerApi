import AssetService from "./asset.service";
import * as ws from "ws";
import { v4 as uuidv4 } from "uuid";
import { Client, location } from "../types";
import eventEmitter from "../util/event_emitter";
import Asset from "../models/Asset";

class AssetTrackerService {
  private clients: Client[] = [];

  constructor(private assetService: AssetService) {
    this.setup();
  }

  async setup() {
    eventEmitter.on("location_change", this.broadcastLocationChange);
  }

  async track(assetId: string, wsClient: ws, clientLocation: location) {
    const asset = await this.assetService.findAssetById(assetId);

    wsClient.send(
      JSON.stringify({
        event: "location_update",
        data: asset,
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

    // wsClient.on("message", function (msg) {
    //   client.send(msg + " res");
    // });

    wsClient.on("close", () => this.removeClient(client.id));
  }

  broadcastLocationChange = async (asset: Asset) => {
    const clients = this.clients.filter((client) => client.assetId === asset.id);
    for (const client of clients) {
      const throttleTimeout = 5000; // 5 seconds

      //Check if a broadcast has been sent within the last 5 seconds
      if(Date.now() - client.lastBroadcast < throttleTimeout) { 
        return;
      }

      client.wsClient.send(
        JSON.stringify({
          event: "location_update",
          data: asset,
        })
      );
      client.lastBroadcast = Date.now();
    }
  };

  async removeClient(clientId: string) {
    this.clients = this.clients.filter((client) => client.id !== clientId);
  }
}

export default AssetTrackerService;
