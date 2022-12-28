import { useEffect, useState } from 'react';
import { useLocalStorage } from 'shared-utils/hooks';

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

  const handleSetInterestedEvents = (event: EventType) => {
    const isActive = !!interestedEvents.find(
      (_event) => _event.id === event.id
    );
    try {
      const newInterestedEvents = isActive
        ? interestedEvents.filter((_event) => _event.id !== event.id)
        : [...interestedEvents, event];

      setLocalEvents(newInterestedEvents);
    } catch (error) {
      window.localStorage.removeItem('interested-event');
      setLocalEvents([event]);
    }
  };

  return [interestedEvents, handleSetInterestedEvents] as const;
}
