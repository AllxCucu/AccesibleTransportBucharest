import { OrganizationProxy } from "./Organizations.dto";
import { DtoHelper } from "../helper/DtosHelper";
import { StopsEntityProxy } from "./Stops.dto";

// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class BusProxy {
  public readonly id: number;
  public readonly name: string;
  public readonly type: string;
  public readonly color: string;
  public readonly stops: StopsEntityProxy[] | null;
  public readonly has_notifications: boolean;
  public readonly price_ticket_sms: null;
  public readonly ticket_sms: null;
  public readonly organization: OrganizationProxy;
  public readonly segment_path: string;
  public readonly direction_name_tur: string;
  public readonly direction_name_retur: string;
  public static Parse(d: string): BusProxy {
    return BusProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): BusProxy {
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
    DtoHelper.checkArray(d.stops, field + ".stops", obj);
    if (d.stops) {
      for (let i = 0; i < d.stops.length; i++) {
        d.stops[i] = StopsEntityProxy.Create(d.stops[i], field + ".stops" + "[" + i + "]");
      }
    }
    if (d.stops === undefined) {
      d.stops = null;
    }
    DtoHelper.checkBoolean(d.has_notifications, false, field + ".has_notifications", obj);
    DtoHelper.checkNull(d.price_ticket_sms, field + ".price_ticket_sms", obj);
    if (d.price_ticket_sms === undefined) {
      d.price_ticket_sms = null;
    }
    DtoHelper.checkNull(d.ticket_sms, field + ".ticket_sms", obj);
    if (d.ticket_sms === undefined) {
      d.ticket_sms = null;
    }
    d.organization = OrganizationProxy.Create(d.organization, field + ".organization");
    DtoHelper.checkString(d.segment_path, false, field + ".segment_path", obj);
    DtoHelper.checkString(d.direction_name_tur, false, field + ".direction_name_tur", obj);
    DtoHelper.checkString(d.direction_name_retur, false, field + ".direction_name_retur", obj);
    return new BusProxy(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.name = d.name;
    this.type = d.type;
    this.color = d.color;
    this.stops = d.stops;
    this.has_notifications = d.has_notifications;
    this.price_ticket_sms = d.price_ticket_sms;
    this.ticket_sms = d.ticket_sms;
    this.organization = d.organization;
    this.segment_path = d.segment_path;
    this.direction_name_tur = d.direction_name_tur;
    this.direction_name_retur = d.direction_name_retur;
  }
}

