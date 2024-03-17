import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
  data: any;
  moreData: any;
  subscription!: Subscription;
  moreDataSubscription!: Subscription;
  selectedPostIndex: number | null = null;
  hover: boolean = false;
  showModal: boolean = false;
  selectedPost: any;
  imageLoaded: boolean = false;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  selectPost(index: number): void {
    this.selectedPostIndex = index;
    this.selectedPost = this.data[index];

    this.imageLoaded = false;

    this.moreDataSubscription = this.dataService.getImage().subscribe(moreData => {
      this.moreData = moreData.image;
      this.imageLoaded = true;
      this.showModal = true;
      debugger;
    });

     // Показать модальное окно
  }

  closeModal(): void {
    this.showModal = false; // Скрыть модальное окно
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.moreDataSubscription) {
      this.moreDataSubscription.unsubscribe();
    }
  }
}
