import { ArrivingTimesEntityProxy } from "./ArrivingTimes.dto";
import { OrganizationProxy } from "./Organizations.dto";
import { TimetableEntityProxy } from "./TimetableEntity.dto";
import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;
export class LinesEntityProxy {
    public readonly id: number;
    public readonly name: string | null;
    public readonly type: string | null;
    public readonly color: string | null;
    public readonly description: string | null;
    public readonly direction: number | null;
    public readonly direction_name: string | null;
    public  readonly arriving_time: number;
    public readonly arriving_times: ArrivingTimesEntityProxy[] | null;
    public readonly is_timetable: boolean | null;
    public readonly timetable: TimetableEntityProxy[] | null;
    public readonly organization: OrganizationProxy | null;
    public static Parse(d: string): LinesEntityProxy {
        return LinesEntityProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): LinesEntityProxy {
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
        DtoHelper.checkString(d.name, false, field + ".name", obj);
        DtoHelper.checkString(d.type, false, field + ".type", obj);
        DtoHelper.checkString(d.color, false, field + ".color", obj);
        DtoHelper.checkString(d.description, false, field + ".description", obj);
        DtoHelper.checkNumber(d.direction, false, field + ".direction", obj);
        DtoHelper.checkString(d.direction_name, false, field + ".direction_name", obj);
        DtoHelper.checkNumber(d.arriving_time, true, field + ".arriving_time", obj);
        if (d.arriving_time === undefined) {
            d.arriving_time = null;
        }
        DtoHelper.checkArray(d.arriving_times, field + ".arriving_times", obj);
        if (d.arriving_times) {
            for (let i = 0; i < d.arriving_times.length; i++) {
                d.arriving_times[i] = ArrivingTimesEntityProxy.Create(d.arriving_times[i], field + ".arriving_times" + "[" + i + "]");
            }
        }
        if (d.arriving_times === undefined) {
            d.arriving_times = null;
        }
        DtoHelper.checkBoolean(d.is_timetable, false, field + ".is_timetable", obj);
        DtoHelper.checkArray(d.timetable, field + ".timetable", obj);
        if (d.timetable) {
            for (let i = 0; i < d.timetable.length; i++) {
                d.timetable[i] = TimetableEntityProxy.Create(d.timetable[i], field + ".timetable" + "[" + i + "]");
            }
        }
        if (d.timetable === undefined) {
            d.timetable = null;
        }
        d.organization = OrganizationProxy.Create(d.organization, field + ".organization");
        return new LinesEntityProxy(d);
    }
    private constructor(d: any) {
        this.id = d.id;
        this.name = d.name;
        this.type = d.type;
        this.color = d.color;
        this.description = d.description;
        this.direction = d.direction;
        this.direction_name = d.direction_name;
        this.arriving_time = d.arriving_time;
        this.arriving_times = d.arriving_times;
        this.is_timetable = d.is_timetable;
        this.timetable = d.timetable;
        this.organization = d.organization;
    }
}
