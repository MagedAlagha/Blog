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
  constructor(
    private Blogsservice: BlogsServiceService,
    private router: Router
  ) {}
  title = 'Home Component';
  Blogs: Blog[] = [];

  /**/
  POSTS: any;
  page: number = 1;
  count: number = 0;

  ngOnInit(): void {
    this.Blogsservice.getAll().subscribe((data) => (this.Blogs = data));
  }

  openPost(id: any) {
    console.log(id);
    this.router.navigate(['/postdetails/' + id]);
  }
}
