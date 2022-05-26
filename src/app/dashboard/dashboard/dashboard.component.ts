import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';
import { AddpostFormComponent } from '../addpost-form/addpost-form.component';

@Component({
  selector: 'plog-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'DashboardComponent';
  constructor(
    private Blogsservice: BlogsServiceService,
    public dialog: MatDialog
  ) {}
  Blogs: Blog[] = [];

  ngOnInit(): void {
    this.Blogsservice.getAll().subscribe((data) => (this.Blogs = data));
  }
  data: any = new Date();

  async addBlogs() {
    const newBlogs = await this.Blogsservice.create({
      title: 'welcome to my firt post',
      content:
        'teast so dont specimen book with you ,this npost for teast so dont care with you ,this npost for teast so dont',
      image: '../assets/image/Sandwich with delicious cheeses.jpg',
      status: true,
      publish_date: this.data,
      author: 'danu ali',
      tag: 'histoty',
    } as Blog);
    console.log(newBlogs);
  }
  async deleteBlog(id: any) {
    await this.Blogsservice.delete(id);

    console.log(id + 'deleteBlogs');
  }
  addBlogsDialog() {
    this.dialog.open(AddpostFormComponent);
  }
  edit(id: any) {}
  update(id: any) {}
}
