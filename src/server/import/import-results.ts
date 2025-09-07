type ParticipantResult = {
  Position: number;
  Dossard: number;
  Nom: string;
  Epreuve: string;
  Points: number;
  START: number;
  SLALOM: number;
  EXPERT: number;
  ROCK: number;
  RETURN: number;
};
const defaultUrl = 'https://api.raceresult.com/353920/MJG4CL0YJOPKOI9DNM8UZNO46NDZS6O2';

export async function fetchResults(url = defaultUrl): Promise<ParticipantResult[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }
  const data = await response.json();
  return data as ParticipantResult[];
}
