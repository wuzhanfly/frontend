import * as React from 'react';

export default function Unfinalized(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
      { ...props }
    >
      <rect width="18.4" height="18.4" x=".8" y=".8" stroke="currentColor" strokeWidth="1.6" rx="3.2"/>
    </svg>
  );
}