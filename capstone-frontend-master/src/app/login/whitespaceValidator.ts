import { AbstractControl, ValidationErrors } from '@angular/forms';

  

export class whitespaceValidator {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {

        if(control.value == null)
            return null;
        if((control.value as string).indexOf(' ') >= 0){

            return {cannotContainSpace: true}

        }
        return null;

    }

}