import React from 'react';

type Props = {
  className?: string;
};

export default function LoadingSkeleton({ className = '' }: Props) {
  return <div className={`skeleton rounded-sm mb-2 bg-gray-200 ${className}`}></div>;
}
