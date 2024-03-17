import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { DataServiceService } from '../data-service.service';
import { PostDetailsModalComponent } from '../post-details-modal/post-details-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mockDataService: jasmine.SpyObj<DataServiceService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataServiceService', ['getData']);
    mockDataService.getData.and.returnValue(of([{ id: 1, title: 'Test Post' }]));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        HomePageComponent,
        PostDetailsModalComponent // Добавьте компонент модального окна здесь
      ],
      providers: [{ provide: DataServiceService, useValue: mockDataService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Запуск инициализации компонента
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and load data on init', () => {
    expect(component.data).toEqual([{ id: 1, title: 'Test Post' }]);
  });

  it('should set selectedPost and showModal to true on selectPost', () => {
    component.selectPost(0); // Выбор первого поста
    expect(component.selectedPost).toEqual({ id: 1, title: 'Test Post' });
    expect(component.showModal).toBeTrue();
  });

  it('should set showModal to false on closeModal', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });

  afterEach(() => {
    if (component.subscription) {
      component.subscription.unsubscribe();
    }
  });
});
