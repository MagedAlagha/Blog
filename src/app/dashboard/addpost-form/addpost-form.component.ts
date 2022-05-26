import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';

@Component({
  selector: 'plog-addpost-form',
  templateUrl: './addpost-form.component.html',
  styleUrls: ['./addpost-form.component.scss'],
})
export class AddpostFormComponent implements OnInit {
  addPostForm!: FormGroup;

  constructor(private Blogsservice: BlogsServiceService) {
    this.addPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      author: new FormControl(''),
      tag: new FormControl(''),
      status: new FormControl(''),
      publish_date: new FormControl(new Date()),
      image: new FormControl(''),
    });
  }
  /*   submit() {
     console.log(this.addPostForm.controls['image'].value);

  } */
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
    console.log(this.addPostForm.controls['status'].value);
    // const newBlogs = await this.Blogsservice.create({
    //   ...this.addPostForm.value,
    // } as Blog);
    // console.log(newBlogs);
    // console.log(this.addPostForm.value);
  }
  ngOnInit(): void {}
}
