import React from 'react';

interface EventCardSkeletonProps {
  isLandscape?: boolean;
}

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = ({
  isLandscape = false,
}) => {
  if (isLandscape) {
    return (
      <div className="shadow-complete flex min-h-[7rem] w-full gap-2 rounded-2xl bg-white p-1 sm:p-2 md:gap-4">
        <div className="aspect-[2/1] w-28 rounded-xl bg-gray-100 sm:w-56"></div>
        <div className="flex flex-1 flex-col gap-2 p-1">
          <div className="h-4 w-1/3 rounded-xl bg-gray-100"></div>
          <div className="h-4 w-3/5 rounded-xl bg-gray-100"></div>
          <div className="h-4 w-1/5 rounded-xl bg-gray-100"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[22rem] w-full animate-pulse flex-col rounded-2xl bg-white p-1 duration-200">
      <div className="aspect-[2/1] w-full rounded-xl bg-gray-100"></div>
      <div className="flex flex-1 flex-col justify-between p-[14px]">
        <div className="space-y-1">
          <div className="h-4 w-1/2 rounded-xl bg-gray-100"></div>
          <div className="h-4 w-4/5 rounded-xl bg-gray-100"></div>
          <div className="h-4 w-1/3 rounded-xl bg-gray-100"></div>
        </div>
        <div className="h-8 rounded-xl bg-gray-100"></div>
      </div>
    </div>
  );
};
