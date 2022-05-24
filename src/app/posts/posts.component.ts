import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { PostService } from '../services/post.service';
import { Post } from './Post.modele';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  postsData: Post[];
  error = null;
  constructor(private http: HttpClient, private _postService: PostService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
    this.getPosts();
  }

  onCreatePost() {
    this._postService.CreatePost(this.postForm.value).subscribe((response) => {
      console.log(response);
      this.getPosts();
    });
  }
  getPosts() {
    this._postService.fetchPosts().subscribe((data) => {
      this.postsData = data;
    }, error => {
      this.error = error.message
    });

  }

  onClearPosts(event: Event) {
    event.preventDefault();
    this._postService.ClearPost();
    this.getPosts();
    //this.postsData = [];
  }
}
