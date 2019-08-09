import {Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../../core/model/user.model";
import {ApiService} from "../../../core/service/api.service";
import {DataService} from '../../../core/service/data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  cities: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");

    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }

    this.cities = this.dataService.getCities();

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: [''],
      password: [''],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      city: [''],
      age: [''],
      salary: ['']
    });

    this.apiService.getUserById(parseInt(userId, 10))
      .subscribe( data => {
        // this.editForm.setValue(data.result);
        console.log(data)
        const anyData: any = data
        const user = anyData
        this.editForm.setValue(user);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // if (data.status === 200) {
          //   alert('User updated successfully.');
            this.router.navigate(['list-user']);
          // } else {
          //   alert(data.message);
          // }
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }
}
