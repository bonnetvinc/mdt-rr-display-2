'use client';

import { useEffect, useState } from 'react';
import { fetchResults, type ParticipantResult } from '~/server/import/import-results';
import AutoTabs from '../results/_components/result-displays/AutoTabs';

export default function FetchExamplePage() {
  const [participantCategories, setParticipantCategories] = useState<string[]>([]);
  const [participantResults, setParticipantResults] = useState<ParticipantResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchResults();
      setParticipantResults(data);
      if (participantCategories.length === 0)
        setParticipantCategories(data.map(item => item.Epreuve).filter((v, i, a) => a.indexOf(v) === i));

      setLoading(false);
    }

    loadData();

    const interval = setInterval(loadData, 60_000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-6">
      <AutoTabs
        categories={participantCategories}
        timerDelayDefault={5000}
        pageSize={14}
        participantResults={participantResults}
      />
    </div>
  );
}
