// Represents the Premier League competition
interface Competition {
  name: string;
  flag: string;
  emblem: string;
  season: string;
}

// Represents a Premier League team
interface Team {
  name: string;
  position: number;
  crest: string;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
