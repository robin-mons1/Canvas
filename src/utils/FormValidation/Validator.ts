import {BaseValidator} from "@/utils/FormValidation/Validators/BaseValidator";
import {reactive, Ref} from "vue";

export class Validator {
    public validators: {[key: string]: Ref<BaseValidator<any>>} | {[key: string]: BaseValidator<any>};

    constructor(validators: {[key: string]: Ref<BaseValidator<any>>} | {[key: string]: BaseValidator<any>}) {
        this.validators = validators;
    }

    validate(): boolean {
        let success = true;

        Object.keys(this.validators).forEach((key) => {
            const validator = this.validators[key];
            let validationSuccess = validator.value.validate();
            if(success && !validationSuccess) {
                success = false;
            }
        });
        return success;
    }
}
