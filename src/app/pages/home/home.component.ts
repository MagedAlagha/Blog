import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';
@Component({
  selector: 'plog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'Home Component';
  Blogs: Blog[] = [];

  /**/
  POSTS: any;
  page: number = 1;
  count: number = 0;
  filterTags = new FormControl();
  constructor(
    private Blogsservice: BlogsServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.Blogsservice.getAll().subscribe((data) => (this.Blogs = data));
  
  }
  onFilterTags() {}
  openPost(id: any) {
    console.log(id);
    this.router.navigate(['/postdetails/' + id]);
  }
}
