import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;

export class ArrivingTimesEntityProxy {
    public readonly arrivingTime: number | null;
    public readonly timetable: boolean | null;
    public static Parse(d: string): ArrivingTimesEntityProxy {
        return ArrivingTimesEntityProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): ArrivingTimesEntityProxy {
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
        DtoHelper.checkNumber(d.arrivingTime, false, field + ".arrivingTime", obj);
        DtoHelper.checkBoolean(d.timetable, false, field + ".timetable", obj);
        return new ArrivingTimesEntityProxy(d);
    }
    private constructor(d: any) {
        this.arrivingTime = d.arrivingTime;
        this.timetable = d.timetable;
    }
}
