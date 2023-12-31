import { useEffect, useState } from 'react';
import { useLocalStorage } from 'shared-utils/hooks';
// import { Event } from 'custom-types';

export function useLocalInterestedEvent() {
  const [localEvents, setLocalEvents] = useLocalStorage<any[]>(
    'interested-events',
    []
  );
  const [interestedEvents, setInterestedEvents] = useState<any[]>([]);

  useEffect(() => {
    setInterestedEvents(localEvents);
  }, [localEvents]);

  const handleSetInterestedEvents = (event: any) => {
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
