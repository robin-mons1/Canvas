import {BaseValidator} from "@/utils/FormValidation/Validators/BaseValidator";

export class TextValidator extends BaseValidator<string> {
    validate(): boolean {
        this.errors = [];
        return super.validate();
    }
}
