import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../core/service/api.service";
import {DataService} from '../../../core/service/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  cities: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    this.cities = this.dataService.getCities();

    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      city: [''],
      age: [''],
      salary: ['']
    });
  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value)
      .subscribe(
        data => {
        this.router.navigate(['list-user']);
      },
        error => {
          alert( JSON.stringify(error) );
        });
  }

}
