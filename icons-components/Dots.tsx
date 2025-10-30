import * as React from 'react';

export default function Dots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <circle cx="2" cy="2" r="2" fill="currentColor"/>
  <circle cx="9" cy="2" r="2" fill="currentColor"/>
  <circle cx="16" cy="2" r="2" fill="currentColor"/>
    </svg>
  );
}