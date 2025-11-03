import * as React from 'react';

export default function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
      { ...props }
    >
      <g clipPath="url(#a)">
    <path fill="currentColor" d="M8.857 9H17a1 1 0 0 1 1 1v.286a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h5.857Z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="currentColor" d="M0 0h20v20H0z"/>
    </clipPath>
  </defs>
    </svg>
  );
}