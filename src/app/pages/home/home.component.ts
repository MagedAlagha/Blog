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
  blogsView: Blog[] = [];
  allBlogs: Blog[] = [];
  loading: boolean = false;
  /**/
  page: number = 1;
  count: number = 0;
  filterTags = new FormControl();
  constructor(
    private Blogsservice: BlogsServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.Blogsservice.getAll().subscribe((data) => {
      this.blogsView = data;
      this.allBlogs = data;
      this.loading = false;
    });
    this.onFilterTags();
  }
  onFilterTags() {
    this.filterTags.valueChanges.subscribe((value: any[]) => {
      this.blogsView = [];
      if (value.length > 0) {
        value.forEach((item) => {
          this.blogsView.push(
            ...this.allBlogs.filter(
              (value) => value.tag == item && !value.status
            )
          );
        });
      } else {
        this.blogsView = this.allBlogs;
      }
      console.log('blogsView', this.blogsView);
    });
  }
  openPost(id: any) {
    console.log(id);
    this.router.navigate(['/postdetails/' + id]);
  }
}
