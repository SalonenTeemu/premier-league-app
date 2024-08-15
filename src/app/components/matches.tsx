import MatchesView from "@/app/components/matchesView";
import { Competition, Match } from "./types/types";

/**
 * Fetches the match data from external football-data.org API.
 * @returns {Promise<Match[]>} A promise that resolves to an array of Match objects.
 * @returns An an object containing competition data and an array of matches data.
 * @throws {Error} If fetching the data fails or if the data format is invalid.
 */
async function getMatchData(): Promise<{
  competition: Competition;
  matches: Match[];
}> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined.");
  }

  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/matches",
    {
      headers: {
        "X-Auth-Token": apiKey,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch match data");
  }

  const data = await res.json();

  if (
    data.matches &&
    data.matches[0].season &&
    data.competition &&
    data.matches[0].area &&
    data.filters
  ) {
    const matches = data.matches.map((PLmatch: Match) => ({
      matchday: PLmatch.matchday,
      date: PLmatch.utcDate,
      homeTeam: {
        name: PLmatch.homeTeam.name,
        crest: PLmatch.homeTeam.crest,
        score: PLmatch.score.fullTime.home,
      },
      awayTeam: {
        name: PLmatch.awayTeam.name,
        crest: PLmatch.awayTeam.crest,
        score: PLmatch.score.fullTime.away,
      },
    }));
    const competition = {
      name: data.competition.name,
      flag: data.matches[0].area.flag,
      emblem: data.competition.emblem,
      season: data.filters.season,
      currentMatchday: data.matches[0].season.currentMatchday,
    };

    console.log("Fetched match data successfully");
    return { competition, matches };
  } else {
    throw new Error("Invalid data format");
  }
}

export default async function Matches() {
  let error: string | null = null;

  let competition: Competition | null = null;
  let matches: Match[] | null = null;
  try {
    const compAndMatchesData = await getMatchData();
    matches = compAndMatchesData.matches;
    competition = compAndMatchesData.competition;
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error = err.message || "Failed to fetch match data";
  }

  if (error) {
    return <div className="text-slate-50">Error: {error}</div>;
  }

  if (!matches || matches.length === 0) {
    return <div className="text-slate-50">No matches found</div>;
  }

  return <MatchesView competition={competition} matches={matches} />;
}
