import * as ws from "ws";

export interface Location{
    latitude: string;
    longitude: string;
}
export interface Client{
    id: string;
    wsClient: ws;
    location: Location
    assetId: string;
    lastBroadcast: number;
}