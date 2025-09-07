export type ResultDisplayProps =
  | {
      totalPoints: number;
      totalDistance: number;
      totalElevation: number;
      id: number;
      bib: number;
      name: string | null;
      team: string | null;
      contest: string;
      position: number;
    }[]
  | undefined;
