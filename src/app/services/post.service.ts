import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs';
import { Post } from '../posts/Post.modele';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private _authService: AuthService) { }
  CreatePost(postData: Post) {
    //console.log(this.postForm.value);
    return this.http.post<{ name: string }>(
      'https://.firebasedatabase.app/posts.json',
      postData, {
      headers: new HttpHeaders({
        'custom-header': 'Post Test'
      }),
      observe: 'body'
    });
  }

  ClearPost() {
    //console.log(this.postForm.value);
    return this.http.delete('https://.firebasedatabase.app/posts.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(response => {
        if (response.type === HttpEventType.Sent) {
          console.log('request sent');
        }
        if (response.type === HttpEventType.Response) {
          console.log(response);
        }
      }))
      .subscribe(response => {
        //console.log(response);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(
      'https://.firebasedatabase.app/posts.json').pipe(
        map((response) => {
          let posts: Post[] = [];
          //console.log(response);
          for (let key in response) {
            posts.push({ ...response[key], key });
          }
          return posts;
        })
      );
  }
}
