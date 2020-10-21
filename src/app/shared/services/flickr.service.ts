import { environment } from './../../../environments/environment';
import { Photo } from './../models/photo';
import { PhotoAccessData } from '../models/photo-access-data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private http: HttpClient) {}

  private url = environment.photoApiUrl;

  // TODO find a rxjs operator to simplify this function

  getFlickrImages(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(this.url, { params }).pipe(
      map((res: any) => {
        const currPagePhotos = [];
        res.photos.photo.forEach((photoRes: PhotoAccessData) => {
          let description: string;

          this.getImageDescription(photoRes.id).subscribe(
            (descriptionRes) => {
              description = descriptionRes;
            },
            () => {},
            () => {
              const photo: Photo = {
                imgUrl: `https://live.staticflickr.com/${photoRes.server}/${photoRes.id}_${photoRes.secret}.jpg`,
                title: photoRes.title,
                description: description,
              };
              currPagePhotos.push(photo);
            }
          );
        });
        return currPagePhotos;
      })
    );
  }

  getImageDescription(photoId: string) {
    const url = environment.descriptionApiUrl;

    const params = new HttpParams().set('photo_id', photoId);
    return this.http.get(url, { params }).pipe(
      map((res: any) => {
        return res.photo.description['_content'];
      })
    );
  }
}
