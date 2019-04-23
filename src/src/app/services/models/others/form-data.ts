import { FormInputData } from "./form-input-data";
export class FormData {
    constructor(
        public inputData: FormInputData[],
        public formName: string,
        public submitButtonName: string = "Submit",
        public shouldDisplayMappings: boolean = false,
        public isDisabled: boolean = false) {}
}
