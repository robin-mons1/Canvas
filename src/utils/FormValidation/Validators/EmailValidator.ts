import {BaseValidator} from "@/utils/FormValidation/Validators/BaseValidator";

export class EmailValidator extends BaseValidator<string> {
    protected type = "email";
    private emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    validate(): boolean {
        this.errors = [];
        if(!this.emailRegex.test(this.value)) {
            this.errors.push("Invalid email format");
        }
        return super.validate();
    }
}
