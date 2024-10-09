import { SortBy } from 'src/app/types/sort-by';
import { compareValues, sortByReleaseDate } from './common';

type ContentWithReviewCount = {
  id: string;
  reviewCount: number;
  rating: number;
};

interface ContentWithReleaseDate extends ContentWithReviewCount {
  detail?: { releaseDate?: string | Date };
}

export function sortContent<T extends ContentWithReleaseDate>(
  contentList: T[],
  sortBy: SortBy
): T[] {
  switch (sortBy) {
    case 'mostPopular':
      return [...contentList].sort(compareValues('reviewCount', 'desc', 'id'));
    case 'newRelease':
      return sortByReleaseDate(contentList);
    case 'best':
      return [...contentList].sort(compareValues('rating', 'desc', 'id'));
    case 'worst':
      return [...contentList].sort(compareValues('rating', 'asc', 'id'));
    default:
      return contentList;
  }
}

const sortingTitles: Record<SortBy, string> = {
  mostPopular: 'Más populares',
  newRelease: 'Nuevos lanzamientos',
  best: 'Mejor calificado',
  worst: 'Peor calificado',
};

export function getSortingTitle(sortBy: SortBy): string {
  return sortingTitles[sortBy] || '';
}
