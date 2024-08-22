export interface Image {
  id: string;
  filename: string;
  width: number;
  height: number;
  bucketType: string;
  bucketPath: string;
}

export interface CriticScoreSummary {
  url: string;
  max: number;
  score: number;
  normalizedScore: number;
  reviewCount: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  sentiment: string;
}

export interface Game {
  id: number;
  type: string;
  url: string;
  title: string;
  slug: string;
  images: Image[];
  criticScoreSummary: CriticScoreSummary;
  tags: string[];
}

export interface ComponentData {
  items: Game[];
}
