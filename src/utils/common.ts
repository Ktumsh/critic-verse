import { ChangeDetectorRef } from '@angular/core';
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

export function refresher(event: any, loadContent: () => Promise<void>) {
  loadContent().then(() => {
    event.target.complete();
  });
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  let parsedDate: Date;

  if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number);
    parsedDate = new Date(Date.UTC(year, month - 1, day));
  } else {
    parsedDate = date;
  }
  const year = parsedDate.getUTCFullYear();
  const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = parsedDate.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateAge(birthday: Date, today: Date): number {
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}

export function calculateDaysUntilBirthday(birthday: Date): number {
  const today = new Date();
  const nextBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );

  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diff = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const inputDate = new Date(date + ' UTC');

  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  if (diffInSeconds < 0) {
    return '0m';
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }
}
