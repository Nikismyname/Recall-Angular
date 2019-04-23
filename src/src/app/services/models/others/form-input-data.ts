export class FormInputData {
  constructor(
    public name: string,
    public displayName: string,
    public type: string,
    public data: any = null,
    public validations: any[] = [],
    public messages: {} = {},
    public placeholder: string = "",
    public errors: object = {}) { }
}
