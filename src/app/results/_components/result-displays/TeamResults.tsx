'use client';
import { FlagIcon, GaugeCircleIcon, MountainSnowIcon } from 'lucide-react';
import type { ParticipantResult } from '~/server/import/import-results';
import PositionMarker from './PositionMarker';

interface TeamResultsProps {
  data: ParticipantResult[];
  isLoading: boolean;
}

type Segments = {
  START: number;
  SLALOM: number;
  EXPERT: number;
  ROCK: number;
  RETURN: number;
};

function TeamResults({ data, isLoading }: TeamResultsProps) {
  if (isLoading) {
    return <div className="text-center text-gray-500">Chargement des résultats...</div>;
  }
  const segmentKeys: (keyof Segments)[] = ['START', 'SLALOM', 'EXPERT', 'ROCK', 'RETURN'];

  const calcStats = (participant: ParticipantResult) => {
    const segmentDistances: Record<keyof Segments, number> = {
      START: 1600,
      SLALOM: 1300,
      EXPERT: 310,
      ROCK: 90,
      RETURN: 0
    };

    const segmentElevation: Record<keyof Segments, number> = {
      START: 20,
      SLALOM: 50,
      EXPERT: 15,
      ROCK: 5,
      RETURN: 0
    };

    let totalMeters = 0;
    let totalElevation = 0;

    segmentKeys.forEach(key => {
      totalMeters += (participant[key] || 0) * segmentDistances[key];
      totalElevation += (participant[key] || 0) * segmentElevation[key];
    });

    return {
      distanceKm: totalMeters / 1000,
      elevationM: totalElevation
    };
  };

  return (
    <div className="overflow-hidden rounded-lg bg-gray-900">
      {/* Table Header */}
      <div className="hidden grid-cols-8 gap-2 bg-gradient-to-r from-green-700 via-orange-700 to-red-700 px-4 py-2 font-bold text-sm sm:grid">
        <div className="col-span-1 text-start">Position</div>
        <div className="col-span-2 text-start">Coureur</div>
        <div className="col-span-1 text-start">Plaque</div>
        <div className="col-span-1 text-start">Tours</div>
        <div className="col-span-1 text-start">Distance</div>
        <div className="col-span-1 text-start">Dénivelé</div>
        <div className="col-span-1 text-start">Pts</div>
      </div>

      {/* Results Rows */}
      {data?.map(participant => {
        const isTopThree = participant.Position <= 3;

        return (
          <div
            key={participant.Dossard}
            className={`grid grid-cols-2 items-center gap-2 border-gray-800 border-b px-4 py-2 text-sm transition-colors hover:bg-gray-800 sm:grid-cols-8 ${isTopThree ? 'bg-gradient-to-r' : 'bg-gray-900'} 
                ${participant.Position === 1 ? 'border-l-4 border-l-yellow-400 from-yellow-900/20 to-transparent' : ''} 
                ${participant.Position === 2 ? 'border-l-4 border-l-gray-400 from-gray-700/20 to-transparent' : ''} 
                ${participant.Position === 3 ? 'border-l-4 border-l-orange-400 from-orange-900/20 to-transparent' : ''}`}
          >
            <div className="col-span-1">
              <PositionMarker position={participant.Position} />
            </div>

            <div className="col-span-2 text-start sm:col-span-2">
              <div className="truncate font-bold text-white">{participant.Nom}</div>
            </div>

            <div className="col-span-1 text-start font-mono text-orange-400 sm:col-span-1">{participant.Dossard}</div>

            <div className="col-span-1 text-start">
              <div className="flex items-center justify-start gap-1">
                <FlagIcon className="h-3 w-3 text-red-400" />
                <span className="font-bold text-red-400">{participant.START}</span>
              </div>
            </div>

            <div className="col-span-1 text-start">
              <div className="flex items-center justify-start gap-1">
                <GaugeCircleIcon className="h-3 w-3 text-orange-400" />
                <span className="font-bold text-orange-400">{calcStats(participant).distanceKm} km</span>
              </div>
            </div>

            <div className="col-span-1 text-start">
              <div className="flex items-center justify-start gap-1">
                <MountainSnowIcon className="h-3 w-3 text-green-400" />
                <span className="font-bold text-green-400">{calcStats(participant).elevationM} m</span>
              </div>
            </div>

            <div className="col-span-1 text-start">
              <div
                className={`rounded px-2 py-1 font-bold text-sm ${participant.Position === 1 ? 'bg-yellow-600 text-white' : ''} 
                    ${participant.Position === 2 ? 'bg-gray-500 text-white' : ''} 
                    ${participant.Position === 3 ? 'bg-orange-800 text-white' : ''} 
                    ${participant.Position > 3 ? 'bg-green-600 text-white' : ''}`}
              >
                {participant.Points} Pts
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TeamResults;
