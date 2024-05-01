import {BaseValidator} from "@/utils/FormValidation/Validators/BaseValidator";

export class NumberValidator extends BaseValidator<number> {
    protected type = "number";
    validate(): boolean {
        this.errors = [];

        return super.validate();
    }
}
