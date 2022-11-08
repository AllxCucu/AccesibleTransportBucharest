import { DtoHelper } from "../helper/DtosHelper";
import { BusProxy } from "./Bus.dto";
import { StopsEntityProxy } from "./Stops.dto";

export class SavedData {
    public direction: number;
    public directionName: string;
    public bus: BusProxy;
    public stop: StopsEntityProxy;

    constructor(direction: number, directionName: string, bus: BusProxy, stop: StopsEntityProxy) {
        this.direction = direction;
        this.directionName = directionName;
        this.bus = bus;
        this.stop = stop;
    }
}
