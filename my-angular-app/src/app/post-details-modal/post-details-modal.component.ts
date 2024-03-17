import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details-modal',
  templateUrl: './post-details-modal.component.html',
  styleUrls: ['./post-details-modal.component.less']
})
export class PostDetailsModalComponent implements OnInit {
  @Input() post: any;
  @Input() show: boolean = false;
  @Input() imageUrl: any;
  @Input() imageLoaded: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  ngOnInit() {
    this.preloadImage(this.imageUrl);
  }

  preloadImage(url: string) {
    const img = new Image();
    img.onload = () => {
      this.imageLoaded = true; // Устанавливаем флаг загрузки в true
      // Если нужно, вызовите здесь change detection
    };
    img.src = url;
  }

  close(): void {
    this.onClose.emit();
  }
}

