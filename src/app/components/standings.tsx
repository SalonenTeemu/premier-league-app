import { Competition, Team } from "./types/types";

/**
 * Fetches the competition and standings data from external football-data.org API.
 * @returns {Promise<any[]>} A promise that resolves to an object containing competition data and an array of Team objects.
 * @returns An an object containing competition data and an standings data.
 * @throws {Error} If fetching the data fails or if the data format is invalid.
 */
async function getCompetitionAndStandingsData(): Promise<{
  competition: Competition;
  standings: Team[];
}> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined.");
  }

  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/standings",
    {
      headers: {
        "X-Auth-Token": apiKey,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch standings data");
  }

  const data = await res.json();

  if (
    data.standings &&
    data.standings[0].table &&
    data.competition &&
    data.season &&
    data.area &&
    data.filters
  ) {
    const standings = data.standings[0].table.map((PLteam: Team) => ({
      name: PLteam.team.name,
      position: PLteam.position,
      crest: PLteam.team.crest,
      playedGames: PLteam.playedGames,
      won: PLteam.won,
      draw: PLteam.draw,
      lost: PLteam.lost,
      points: PLteam.points,
      goalsFor: PLteam.goalsFor,
      goalsAgainst: PLteam.goalsAgainst,
      goalDifference: PLteam.goalDifference,
    }));

    const competition = {
      name: data.competition.name,
      flag: data.area.flag,
      emblem: data.competition.emblem,
      season: data.filters.season,
      currentMatchday: data.season.currentMatchday,
    };

    console.log("Fetched standings data successfully");
    return { competition, standings };
  } else {
    throw new Error("Invalid data format");
  }
}

function StandingsTable({
  competition,
  standings,
}: {
  competition: Competition;
  standings: Team[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <img
            src={competition?.flag}
            alt={`${competition?.name} flag`}
            className="w-12 h-12 mr-4"
          />
          <h1 className="text-3xl font-bold">
            {competition?.name} Season {competition?.season}/
            {parseInt(competition?.season) + 1} Standings
          </h1>
        </div>
        <img
          src={competition?.emblem}
          alt={`${competition?.name} emblem`}
          className="w-20 h-20"
        />
      </div>

      <table className="w-full table-auto border-collapse text-center">
        <thead className="bg-slate-800">
          <tr>
            <th className="border border-slate-700 px-4 py-2">Position</th>
            <th className="border border-slate-700 px-4 py-2">Team</th>
            <th className="border border-slate-700 px-4 py-2">Played</th>
            <th className="border border-slate-700 px-4 py-2">Won</th>
            <th className="border border-slate-700 px-4 py-2">Drawn</th>
            <th className="border border-slate-700 px-4 py-2">Lost</th>
            <th className="border border-slate-700 px-4 py-2">GF</th>
            <th className="border border-slate-700 px-4 py-2">GA</th>
            <th className="border border-slate-700 px-4 py-2">GD</th>
            <th className="border border-slate-700 px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody className="bg-slate-900 text-slate-50 border-slate-700">
          {standings.map((team, index) => (
            <tr key={index} className="hover:bg-slate-800">
              <td className="border border-slate-700 px-4 py-2">
                {team.position}
              </td>
              <td className="border border-slate-700 px-4 py-2 flex items-center">
                <img
                  src={team.crest}
                  alt={`${team.name} crest`}
                  className="w-6 h-6 mr-2"
                />
                {team.name}
              </td>
              <td className="border border-slate-700 px-4 py-2">
                {team.playedGames}
              </td>
              <td className="border border-slate-700 px-4 py-2">{team.won}</td>
              <td className="border border-slate-700 px-4 py-2">{team.draw}</td>
              <td className="border border-slate-700 px-4 py-2">{team.lost}</td>
              <td className="border border-slate-700 px-4 py-2">
                {team.goalsFor}
              </td>
              <td className="border border-slate-700 px-4 py-2">
                {team.goalsAgainst}
              </td>
              <td className="border border-slate-700 px-4 py-2">
                {team.goalDifference}
              </td>
              <td className="border border-slate-700 px-4 py-2 font-bold">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Standings() {
  let error: string | null = null;
  let competition: Competition | null = null;
  let standings: Team[] | null = null;
  try {
    const compAndStandingsData = await getCompetitionAndStandingsData();
    competition = compAndStandingsData.competition;
    standings = compAndStandingsData.standings;
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error = err.message || "Failed to fetch standings data";
  }

  if (error) {
    return <div className="text-slate-50">Error: {error}</div>;
  }

  if (!standings || standings.length === 0) {
    return <div className="text-slate-50">No standings found</div>;
  }

  return <StandingsTable competition={competition} standings={standings} />;
}
