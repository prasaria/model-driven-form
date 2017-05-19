import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; //use later to display form changes

    constructor(private _fb: FormBuilder) {} // form builder simplify form initialization

    ngOnInit() {
        // we will initialize our form model here

        this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            address: this._fb.group({
                street: ['', <any>Validators.required],
                postcode: ['']
            })
        });

        // subscribe to form changes  
        this.subcribeToFormChanges();
        
        // Update single value
        (<FormControl>this.myForm.controls['name'])
            .setValue('John', { onlySelf: true });
    }
    
    
    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }


    save(model: User, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }
}
