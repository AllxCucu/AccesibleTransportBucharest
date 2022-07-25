// Stores the currently-being-typechecked object for error messages.
let obj: any = null;
export class LinesProxy2 {
  public readonly lines: LinesEntityProxy2[] | null;
  public readonly ticket_info: TicketInfoProxy;
  public static Parse(d: string): LinesProxy2 {
    return LinesProxy2.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): LinesProxy2 {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof (d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkArray(d.lines, field + ".lines");
    if (d.lines) {
      for (let i = 0; i < d.lines.length; i++) {
        d.lines[i] = LinesEntityProxy2.Create(d.lines[i], field + ".lines" + "[" + i + "]");
      }
    }
    if (d.lines === undefined) {
      d.lines = null;
    }
    d.ticket_info = TicketInfoProxy.Create(d.ticket_info, field + ".ticket_info");
    return new LinesProxy2(d);
  }
  private constructor(d: any) {
    this.lines = d.lines;
    this.ticket_info = d.ticket_info;
  }
}

export class LinesEntityProxy2 {
  public readonly id: number;
  public readonly name: string;
  public readonly type: string;
  public readonly color: string;
  public readonly has_notifications: boolean;
  public readonly price_ticket_sms: string | null;
  public readonly ticket_sms: string | null;
  public readonly organization: OrganizationProxy;
  public static Parse(d: string): LinesEntityProxy2 {
    return LinesEntityProxy2.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): LinesEntityProxy2 {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof (d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkNumber(d.id, false, field + ".id");
    checkString(d.name, false, field + ".name");
    checkString(d.type, false, field + ".type");
    checkString(d.color, false, field + ".color");
    checkBoolean(d.has_notifications, false, field + ".has_notifications");
    checkString(d.price_ticket_sms, true, field + ".price_ticket_sms");
    if (d.price_ticket_sms === undefined) {
      d.price_ticket_sms = null;
    }
    checkString(d.ticket_sms, true, field + ".ticket_sms");
    if (d.ticket_sms === undefined) {
      d.ticket_sms = null;
    }
    d.organization = OrganizationProxy.Create(d.organization, field + ".organization");
    return new LinesEntityProxy2(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.name = d.name;
    this.type = d.type;
    this.color = d.color;
    this.has_notifications = d.has_notifications;
    this.price_ticket_sms = d.price_ticket_sms;
    this.ticket_sms = d.ticket_sms;
    this.organization = d.organization;
  }
}

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
      throwNull2NonNull(field, d);
    } else if (typeof (d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkNumber(d.id, false, field + ".id");
    checkString(d.logo, false, field + ".logo");
    return new OrganizationProxy(d);
  }
  private constructor(d: any) {
    this.id = d.id;
    this.logo = d.logo;
  }
}

export class TicketInfoProxy {
  public readonly tickets: TicketsEntityProxy[] | null;
  public readonly sms_number: string;
  public readonly disclaimer: string;
  public static Parse(d: string): TicketInfoProxy {
    return TicketInfoProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): TicketInfoProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof (d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkArray(d.tickets, field + ".tickets");
    if (d.tickets) {
      for (let i = 0; i < d.tickets.length; i++) {
        d.tickets[i] = TicketsEntityProxy.Create(d.tickets[i], field + ".tickets" + "[" + i + "]");
      }
    }
    if (d.tickets === undefined) {
      d.tickets = null;
    }
    checkString(d.sms_number, false, field + ".sms_number");
    checkString(d.disclaimer, false, field + ".disclaimer");
    return new TicketInfoProxy(d);
  }
  private constructor(d: any) {
    this.tickets = d.tickets;
    this.sms_number = d.sms_number;
    this.disclaimer = d.disclaimer;
  }
}

export class TicketsEntityProxy {
  public readonly description: string;
  public readonly sms: string;
  public readonly name: string;
  public readonly price: string;
  public static Parse(d: string): TicketsEntityProxy {
    return TicketsEntityProxy.Create(JSON.parse(d));
  }
  public static Create(d: any, field: string = 'root'): TicketsEntityProxy {
    if (!field) {
      obj = d;
      field = "root";
    }
    if (d === null || d === undefined) {
      throwNull2NonNull(field, d);
    } else if (typeof (d) !== 'object') {
      throwNotObject(field, d, false);
    } else if (Array.isArray(d)) {
      throwIsArray(field, d, false);
    }
    checkString(d.description, false, field + ".description");
    checkString(d.sms, false, field + ".sms");
    checkString(d.name, false, field + ".name");
    checkString(d.price, false, field + ".price");
    return new TicketsEntityProxy(d);
  }
  private constructor(d: any) {
    this.description = d.description;
    this.sms = d.sms;
    this.name = d.name;
    this.price = d.price;
  }
}

function throwNull2NonNull(field: string, d: any): never {
  return errorHelper(field, d, "non-nullable object", false);
}
function throwNotObject(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function throwIsArray(field: string, d: any, nullable: boolean): never {
  return errorHelper(field, d, "object", nullable);
}
function checkArray(d: any, field: string): void {
  if (!Array.isArray(d) && d !== null && d !== undefined) {
    errorHelper(field, d, "array", true);
  }
}
function checkNumber(d: any, nullable: boolean, field: string): void {
  if (typeof (d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, "number", nullable);
  }
}
function checkBoolean(d: any, nullable: boolean, field: string): void {
  if (typeof (d) !== 'boolean' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, "boolean", nullable);
  }
}
function checkString(d: any, nullable: boolean, field: string): void {
  if (typeof (d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
    errorHelper(field, d, "string", nullable);
  }
}
function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
  if (nullable) {
    type += ", null, or undefined";
  }
  throw new TypeError('Expected ' + type + " at " + field + " but found:\n" + JSON.stringify(d) + "\n\nFull object:\n" + JSON.stringify(obj));
}
