import * as React from 'react';

export default function TokenPlaceholder(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      { ...props }
    >
      <path d="M7.224 8.076V6.048h9.557v2.028H13.22v9.608h-2.432V8.076H7.224Z" fill="currentColor"/>
    </svg>
  );
}