export class DtoHelper {

    static throwNull2NonNull(field: string, d: any, obj: any): never {
        return this.errorHelper(field, d, "non-nullable object", false, obj);
    }

    static throwNotObject(field: string, d: any, nullable: boolean, obj: any): never {
        return this.errorHelper(field, d, "object", nullable, obj);
    }

    static throwIsArray(field: string, d: any, nullable: boolean, obj: any): never {
        return this.errorHelper(field, d, "object", nullable, obj);
    }

    static checkArray(d: any, field: string, obj: any): void {
        if (!Array.isArray(d) && d !== null && d !== undefined) {
            this.errorHelper(field, d, "array", true, obj);
        }
    }

    static checkNumber(d: any, nullable: boolean, field: string, obj: any): void {
        if (typeof (d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
            this.errorHelper(field, d, "number", nullable, obj);
        }
    }

    static checkBoolean(d: any, nullable: boolean, field: string, obj: any): void {
        if (typeof (d) !== 'boolean' && (!nullable || (nullable && d !== null && d !== undefined))) {
            this.errorHelper(field, d, "boolean", nullable, obj);
        }
    }

    static checkString(d: any, nullable: boolean, field: string, obj: any): void {
        if (typeof (d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
            this.errorHelper(field, d, "string", nullable, obj);
        }
    }

    static checkNull(d: any, field: string, obj: any): void {
        if (d !== null && d !== undefined) {
            this.errorHelper(field, d, "null or undefined", false, obj);
        }
    }

    static errorHelper(field: string, d: any, type: string, nullable: boolean, obj: any): never {
        if (nullable) {
            type += ", null, or undefined";
        }
        throw new TypeError("Expected " + type + " at " + field + " but found:\n" + JSON.stringify(d) + "\n\nFull object:\n" + JSON.stringify(obj));
    }
}
