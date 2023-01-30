import { AbstractControl, AsyncValidatorFn, ValidatorFn, ValidationErrors, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";

export interface ValidationResult {
    [key: string]: boolean;
}
export class CustomValidators {

    static checkLimit(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { "range": true };
            }
            return null;
        };
    }

    static birthDate(control: FormControl): any {
        if (control.value !== null && control.value !== "") {
            const enteredDate = new Date(control.value);
            const todayDate = new Date();

            if (enteredDate > todayDate) {
                return { "futureDate": true };
            }
        }
        return null;
    }

    static nospaceValidator(control: FormControl): any {
        const isWhitespace = (control.value || "").trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { "whitespace": true };
    }

    static cannotContainSpace(control: FormControl) : any {  
        if((control.value as string).indexOf(' ') >= 0){  
            return null 
        }     
        return null;  
    } 

    static noWhitespaceValidator(control: FormControl): any {
        if (control.value === null) {
            const isWhitespace = (control.value || "").length === 0;
            const isValid = !isWhitespace;
            return isValid ? null : { "whitespace": true };
        }
        else{
            const isWhitespace = (control.value.trim() || "").length === 0;
            const isValid = !isWhitespace;
            return isValid ? null : { "whitespace": true };
        }
    }

}

