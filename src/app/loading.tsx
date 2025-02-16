'use client';
import { CircularProgress } from '@heroui/react';

export default function Loading() {
  return (
    <CircularProgress
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      size="md"
      aria-label="Loading..."
    />
  );
}
