import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;
export class StopsEntityProxy {
    public readonly id: number;
    public readonly lat: number;
    public readonly lng: number;
    public readonly name: string;
    public readonly description: string;
    public static Parse(d: string): StopsEntityProxy {
        return StopsEntityProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): StopsEntityProxy {
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
        DtoHelper.checkString(d.name, false, field + ".name", obj);
        DtoHelper.checkString(d.description, false, field + ".description", obj);
        return new StopsEntityProxy(d);
    }
    private constructor(d: any) {
        this.id = d.id;
        this.lat = d.lat;
        this.lng = d.lng;
        this.name = d.name;
        this.description = d.description;
    }
}
