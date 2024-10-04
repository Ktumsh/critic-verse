import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ratingDescription } from 'src/utils/rating-desc';

@Component({
  selector: 'app-home-carousel-section',
  templateUrl: './home-carousel-section.component.html',
  styleUrls: ['./home-carousel-section.component.scss'],
})
export class HomeCarouselSectionComponent {
  @Input() title!: string;
  @Input() list!: any[];
  @Input() detailRoute!: string;
  @Input() viewAllRoute!: string;
  @Input() activeIndices!: number[];
  @Input() carouselClass!: string;
  @Input() sectionClass?: string;
  @Input() isLoading: boolean = false;

  constructor(private router: Router) {}

  goToDetail(itemId: number) {
    this.router.navigate([`${this.detailRoute}/${itemId}`]);
  }

  viewAll() {
    this.router.navigate([this.viewAllRoute]);
  }

  onScroll(container: HTMLElement) {
    const slides = container.querySelectorAll(`.${this.carouselClass}`);
    const containerRect = container.getBoundingClientRect();
    let closestIndices: number[] = [];
    let distances: number[] = [];

    slides.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect();
      const distance = Math.abs(
        containerRect.width / 2 - (slideRect.left + slideRect.width / 2)
      );

      distances.push(distance);
    });

    closestIndices = distances
      .map((distance, index) => ({ distance, index }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)
      .map((item) => item.index);

    this.activeIndices.length = 0;
    this.activeIndices.push(...closestIndices);
  }

  getRatingDescription = ratingDescription;
}
