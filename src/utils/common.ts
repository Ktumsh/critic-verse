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
