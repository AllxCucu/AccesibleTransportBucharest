import { LinesEntityProxy } from "./LinesEntityProxy.dto";
import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;
export class LinesProxy {
    public readonly lines: LinesEntityProxy[] | null;
    public readonly name: string;
    public readonly description: string;
    public readonly transport_type: string;
    public static Parse(d: string): LinesProxy {
        return LinesProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): LinesProxy {
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
        DtoHelper.checkArray(d.lines, field + ".lines", obj);
        if (d.lines) {
            for (let i = 0; i < d.lines.length; i++) {
                d.lines[i] = LinesEntityProxy.Create(d.lines[i], field + ".lines" + "[" + i + "]");
            }
        }
        if (d.lines === undefined) {
            d.lines = null;
        }
        DtoHelper.checkString(d.name, false, field + ".name", obj);
        DtoHelper.checkString(d.description, false, field + ".description", obj);
        DtoHelper.checkString(d.transport_type, false, field + ".transport_type", obj);
        return new LinesProxy(d);
    }
    private constructor(d: any) {
        this.lines = d.lines;
        this.name = d.name;
        this.description = d.description;
        this.transport_type = d.transport_type;
    }
}

