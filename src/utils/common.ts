import { ChangeDetectorRef } from '@angular/core';
import { Game } from 'src/app/types/game';
import { Review } from 'src/app/types/review';

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function ratingClass(rating: number): string {
  if (rating >= 0 && rating < 5) {
    return 'bg-danger';
  } else if (rating >= 5 && rating < 8) {
    return 'bg-warning';
  } else {
    return 'bg-success';
  }
}

export function sortByReleaseDate<
  T extends { detail?: { releaseDate?: Date | string } }
>(items: T[]): T[] {
  return items.sort((a, b) => {
    const dateA = new Date(a.detail?.releaseDate || '').getTime();
    const dateB = new Date(b.detail?.releaseDate || '').getTime();
    return dateB - dateA;
  });
}

export function transformDetail(
  field: string | null,
  type: 'array' | 'json' = 'array'
): any[] {
  if (!field) return type === 'array' ? [] : [];

  if (type === 'array') {
    return field.split(', ').filter((item: string) => item.trim() !== '');
  }

  if (type === 'json') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.error('Error al parsear JSON:', error);
      return [];
    }
  }

  return [];
}

export async function refreshContentData(
  contentId: string,
  loadContentById: (id: string) => Promise<any>,
  cdr?: ChangeDetectorRef
): Promise<void> {
  try {
    await loadContentById(contentId);
    if (cdr) {
      cdr.markForCheck();
    }
  } catch (error) {
    console.error('Error actualizando los datos del contenido:', error);
  }
}

export function transformReviewsData(reviewsData: string | null): Review[] {
  if (!reviewsData) return [];
  const reviews: Review[] = [];
  const reviewStrings = reviewsData.split(',');

  for (const reviewString of reviewStrings) {
    const [id, rating, comment, date, containsSpoilers, userId] =
      reviewString.split('|');
    reviews.push({
      id,
      rating: parseFloat(rating),
      comment,
      date: new Date(date),
      containsSpoilers: containsSpoilers === '1',
      userId,
    });
  }

  return reviews;
}

interface ContentWithReviewCount {
  id: string;
  reviewCount: number;
}

export function compareValues<T extends ContentWithReviewCount>(
  key: keyof T,
  order: 'asc' | 'desc',
  secondaryKey: keyof T
) {
  return (a: T, b: T) => {
    const valueA = a[key] ?? 0;
    const valueB = b[key] ?? 0;

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (valueA !== valueB) {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (valueA !== valueB) {
        return order === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    }

    const secondaryValueA = a[secondaryKey] ?? '';
    const secondaryValueB = b[secondaryKey] ?? '';

    if (
      typeof secondaryValueA === 'string' &&
      typeof secondaryValueB === 'string'
    ) {
      return secondaryValueA.localeCompare(secondaryValueB);
    }

    return 0;
  };
}
