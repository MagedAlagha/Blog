import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/shared/Blogs';
import { BlogsServiceService } from 'src/app/shared/blogs-service.service';
import { Comments } from 'src/app/shared/comments';
import { CommentsService } from 'src/app/shared/comments.service';

@Component({
  selector: 'plog-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  blog: Blog = {} as Blog;
  comments: Comments[] = [];

  post_id: any;
  commentsForm!: FormGroup;

  constructor(
    private Blogsservice: BlogsServiceService,
    private activeroute: ActivatedRoute,
    private commentsservice: CommentsService
  ) {
    /* Start fooooooooooorm*/
    this.commentsForm = new FormGroup({
      postID: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    /*End fooooooooooorm*/

    this.activeroute.params.subscribe((id) => {
      this.post_id = id['id'];
    });
  }
  ngOnInit(): void {
    this.Blogsservice.getById(this.post_id).subscribe(
      (data) => (this.blog = data)
    );
    this.commentsservice.getComments().subscribe((data) => console.log(data));
    console.log(this.comments);
  }

  async submit() {
    if (this.commentsForm.valid) {
      await this.commentsservice.addComment({
        ...this.commentsForm.value,
        postID: this.post_id,
      } as Comments);

      this.commentsForm.reset();
    }
  }
}
