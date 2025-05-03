import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailConfirmValidator(
  control: AbstractControl
): ValidationErrors | null {
  let email = control.parent?.value.email;
  let email_confirm = control.value;
  if (email !== email_confirm) {
    return { email_mismatch: true };
  } else {
    return null;
  }
}
export function passwordConfirmValidator(
  control: AbstractControl
): ValidationErrors | null {
  let password = control.parent?.value.password;
  let password_confirm = control.value;
  if (password !== password_confirm) {
    return { password_mismatch: true };
  } else {
    return null;
  }
}
