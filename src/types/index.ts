import * as ws from "ws";

export interface location{
    latitude: string;
    longitude: string;
}

export interface Client{
    id: string;
    wsClient: ws;
    location: location
    assetId: string;
    lastBroadcast: number;
}