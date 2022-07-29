import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;
export class VehicleProxy {
    public readonly id: number;
    public readonly lat: number;
    public readonly lng: number;
    public readonly code: string;
    public readonly transport_type: string;
    public static Parse(d: string): VehicleProxy {
        return VehicleProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): VehicleProxy {
        if (!field) {
            obj = d;
            field = "root";
        }
        if (d === null || d === undefined) {
            DtoHelper.throwNull2NonNull(field, d, obj);
        } else if (typeof (d) !== 'object') {
            DtoHelper.throwNotObject(field, d, false, obj);
        } else if (Array.isArray(d)) {
            DtoHelper.throwIsArray(field, d, false, obj);
        }
        DtoHelper.checkNumber(d.id, false, field + ".id", obj);
        DtoHelper.checkNumber(d.lat, false, field + ".lat", obj);
        DtoHelper.checkNumber(d.lng, false, field + ".lng", obj);
        DtoHelper.checkString(d.code, false, field + ".code", obj);
        DtoHelper.checkString(d.transport_type, false, field + ".transport_type", obj);
        return new VehicleProxy(d);
    }
    private constructor(d: any) {
        this.id = d.id;
        this.lat = d.lat;
        this.lng = d.lng;
        this.code = d.code;
        this.transport_type = d.transport_type;
    }
}

