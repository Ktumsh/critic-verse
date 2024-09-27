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

export function ratingGameDescription(userRating: number): string {
  if (userRating >= 9) {
    return 'Extremadamente popular entre los jugadores';
  } else if (userRating >= 8) {
    return 'Muy bien valorado por la comunidad';
  } else if (userRating >= 6) {
    return 'Opiniones mixtas de los usuarios';
  } else if (userRating >= 4) {
    return 'Críticas negativas de la mayoría de los jugadores';
  } else if (userRating >= 2) {
    return 'Generalmente no gustado por los usuarios';
  } else {
    return 'Aborrecido por la mayoría de los jugadores';
  }
}

export function ratingCinemaDescription(userRating: number): string {
  if (userRating >= 9) {
    return 'Extremadamente popular entre los espectadores';
  } else if (userRating >= 8) {
    return 'Muy bien valorado por la audiencia';
  } else if (userRating >= 6) {
    return 'Opiniones mixtas de los usuarios';
  } else if (userRating >= 4) {
    return 'Críticas negativas de la mayoría de los espectadores';
  } else if (userRating >= 2) {
    return 'Generalmente no gustado por los usuarios';
  } else {
    return 'Aborrecido por la mayoría de los espectadores';
  }
}

export function ratingPersonalDescription(userRating: number): string {
  if (userRating >= 9) {
    return 'Aclamación universal';
  } else if (userRating === 8) {
    return 'Generalmente favorable';
  } else if (userRating >= 5) {
    return 'Mixta o promedio';
  } else if (userRating >= 2) {
    return 'Generalmente desfavorable';
  } else {
    return 'Aversión abrumadora';
  }
}
