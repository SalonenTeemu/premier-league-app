// Represents the Premier League competition
interface Competition {
  name: string;
  flag: string;
  emblem: string;
  season: string;
  currentMatchday: number;
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

// Represents a Premier League match
interface Match {
  matchday: number;
  date: string;
  homeTeam: {
    name: string;
    crest: string;
    score: number | null;
  };
  awayTeam: {
    name: string;
    crest: string;
    score: number | null;
  };
}
