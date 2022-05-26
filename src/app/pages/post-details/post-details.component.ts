import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';

@Component({
  selector: 'plog-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  blog: Blog = {} as Blog;
  post_id: any;
  constructor(
    private Blogsservice: BlogsServiceService,
    private activeroute: ActivatedRoute
  ) {
    this.activeroute.params.subscribe((id) => {
      this.post_id = id['id'];
    });
  }
  ngOnInit(): void {
    this.Blogsservice.getById(this.post_id).subscribe(
      (data) => (this.blog = data)
    );
  }
}
