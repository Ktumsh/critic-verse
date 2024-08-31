export function ratingDescription(rating: number): string {
  if (rating >= 9) {
    return 'Aclamada mundialmente';
  } else if (rating >= 8) {
    return 'Generalmente favorable';
  } else if (rating >= 6) {
    return 'Recibida con críticas mixtas';
  } else if (rating >= 4) {
    return 'Críticas generalmente negativas';
  } else if (rating >= 2) {
    return 'Mala recepción crítica';
  } else {
    return 'Universalmente despreciada';
  }
}
