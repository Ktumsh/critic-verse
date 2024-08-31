interface Reviewable {
  reviews: { rating: number }[];
}

export function averageRating(item: Reviewable): number {
  if (!item.reviews || item.reviews.length === 0) return 0;

  const totalRating = item.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = totalRating / item.reviews.length;

  return parseFloat(averageRating.toFixed(1));
}
