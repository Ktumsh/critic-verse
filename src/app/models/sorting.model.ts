import { SortBy } from '../types/sort-by';

interface SortingOptions {
  label: string;
  value: SortBy;
}

export const SORTING_OPTIONS: SortingOptions[] = [
  { label: 'Más populares', value: 'mostPopular' },
  { label: 'Nuevos lanzamientos', value: 'newRelease' },
  { label: 'Mejor calificado', value: 'best' },
  { label: 'Peor calificado', value: 'worst' },
];
