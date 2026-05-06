import React from 'react';

export const Skeleton = ({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
);

export const HomeSkeleton = () => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8">
      <Skeleton className="md:col-span-8 h-96 rounded-[2.5rem]" />
      <div className="md:col-span-4 flex flex-col gap-4">
        <Skeleton className="flex-grow rounded-[2.5rem]" />
        <Skeleton className="flex-grow rounded-[2.5rem]" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-[2rem]" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-[2.5rem]" />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);

export const ServicesSkeleton = () => (
  <div className="space-y-8 mt-8">
    <div className="flex flex-col md:flex-row gap-4">
      <Skeleton className="flex-grow h-14 rounded-2xl" />
      <Skeleton className="w-full md:w-48 h-14 rounded-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);

export const AboutSkeleton = () => (
  <div className="space-y-12 mt-12 pb-20">
    <div className="text-center space-y-4">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
    <Skeleton className="h-[400px] rounded-[3rem]" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-64 rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);

export const ContactSkeleton = () => (
  <div className="mt-12 space-y-12 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
      <Skeleton className="h-[500px] rounded-[3rem]" />
    </div>
  </div>
);
