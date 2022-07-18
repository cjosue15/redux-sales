import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [
  ]
})
export class SalesComponent {

  salesForm: FormGroup;
  
  constructor(private _fb: FormBuilder) { 
    this.salesForm = this._fb.group({
      description: new FormControl(null, Validators.required),
      ammount: new FormControl(null, Validators.required)
    })
  }

  submit() {
    console.log(this.salesForm.value)
  }

}
