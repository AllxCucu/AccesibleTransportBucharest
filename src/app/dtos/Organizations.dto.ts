import { DtoHelper } from "../helper/DtosHelper";

let obj: any = null;
export class OrganizationProxy {
    public readonly id: number;
    public readonly logo: string;
    public static Parse(d: string): OrganizationProxy {
        return OrganizationProxy.Create(JSON.parse(d));
    }
    public static Create(d: any, field: string = 'root'): OrganizationProxy {
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
        DtoHelper.checkString(d.logo, false, field + ".logo", obj);
        return new OrganizationProxy(d);
    }
    private constructor(d: any) {
        this.id = d.id;
        this.logo = d.logo;
    }
}
