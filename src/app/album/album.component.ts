import { Photo } from './../shared/models/photo';
import { FlickrService } from './../shared/services/flickr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private flickrService: FlickrService) {}
  PAGE_SIZE = 20;
  displayedPhotos: Photo[];
  current_page = 1;

  ngOnInit(): void {
    this.getPhotos();
  }

  /**
   * Loads the album photos of a certain page
   */
  getPhotos() {
    this.flickrService
      .getFlickrImages(this.current_page)
      .subscribe((photoRes) => {
        this.displayedPhotos = photoRes;
      });
  }

  /**
   * Navigates to the previous page of the album
   */
  onPrevious() {
    if (this.current_page > 1) {
      this.current_page -= 1;
    }
    this.getPhotos();
  }

  /**
   * Navigates the next page of the album
   */

  onNext() {
    this.getPhotos();
    this.current_page += 1;
  }
}
