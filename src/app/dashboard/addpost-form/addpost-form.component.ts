import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';

@Component({
  selector: 'plog-addpost-form',
  templateUrl: './addpost-form.component.html',
  styleUrls: ['./addpost-form.component.scss'],
})
export class AddpostFormComponent implements OnInit {
  addPostForm!: FormGroup;

  constructor(
    private Blogsservice: BlogsServiceService,
    public dialogRef: MatDialogRef<AddpostFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addPostForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new FormControl(''),
      tag: new FormControl(''),
      status: new FormControl(''),
      publish_date: new FormControl(),
      image: new FormControl(''),
    });
  }
  ngOnInit(): void {
    if (this.data) {
      this.addPostForm.setValue(this.data);
    }
  }

  img(img: any) {
    this.handleUpload(img.target.files[0]);
  }
  handleUpload(event: any) {
    const file = event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addPostForm.controls['image'].setValue(reader.result);
    };
  }
  async submit() {
    console.log('addPostForm', this.addPostForm.value);
    if (this.addPostForm.valid) {
      if (this.data) {
        await this.Blogsservice.update({
          ...this.addPostForm.value,
        });
      } else {
        await this.Blogsservice.create({
          ...this.addPostForm.value,
          publish_date: moment(new Date()).format('DD-MM-yyyy'),
        } as Blog);
      }

      this.dialogRef.close();
    } else {
    }
  }
}
