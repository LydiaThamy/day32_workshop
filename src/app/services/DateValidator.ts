import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function DateValidator() : ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value

    if (!value)
      return null

    return (new Date(value) < new Date()) ? { presentOrFuture: true } as ValidationErrors : null
  }
}
