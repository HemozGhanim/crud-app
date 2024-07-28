import { FormControl, FormGroup } from '@angular/forms';

export interface userData {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  returnSecureToken: FormControl<boolean | null>;
}
