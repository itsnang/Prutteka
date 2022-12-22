import { useEffect, useState } from 'react';
import { useLocalStorage } from '../shared-hooks';

export interface EventType {
  date: string;
  time: string;
  title: string;
  location: string;
  img: string;
  id: number;
}

export function useLocalInterestedEvent() {
  const [localEvents, setLocalEvents] = useLocalStorage<EventType[]>(
    'interested-events',
    []
  );
  const [interestedEvents, setInterestedEvents] = useState<EventType[]>([]);

  useEffect(() => {
    setInterestedEvents(localEvents);
  }, [localEvents]);

  return [interestedEvents, setLocalEvents] as const;
}
