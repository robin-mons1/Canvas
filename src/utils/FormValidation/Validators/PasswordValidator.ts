import {BaseValidator} from "@/utils/FormValidation/Validators/BaseValidator";

export class PasswordValidator extends BaseValidator<string> {
    protected type = "password";
    private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+`\-={}[\]:;"'<>,.?/\\|])[\w!@#$%^&*()_+`\-={}[\]:;"'<>,.?/\\|]+$/;


    validate(): boolean {
        this.errors = [];
        if(!this.passwordRegex.test(this.value)) {
            this.errors.push("Enter a valid password.")
        }
        return super.validate();
    }
}
