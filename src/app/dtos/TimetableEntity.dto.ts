import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;

export class TimetableEntityProxy {
    public readonly hour: string | null;
    public readonly minutes: string[] | null;
    public static Parse(d: string): TimetableEntityProxy {
        return TimetableEntityProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): TimetableEntityProxy {
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
        DtoHelper.checkString(d.hour, false, field + ".hour", obj);
        DtoHelper.checkArray(d.minutes, field + ".minutes", obj);
        if (d.minutes) {
            for (let i = 0; i < d.minutes.length; i++) {
                DtoHelper.checkString(d.minutes[i], false, field + ".minutes" + "[" + i + "]", obj);
            }
        }
        if (d.minutes === undefined) {
            d.minutes = null;
        }
        return new TimetableEntityProxy(d);
    }
    private constructor(d: any) {
        this.hour = d.hour;
        this.minutes = d.minutes;
    }
}
