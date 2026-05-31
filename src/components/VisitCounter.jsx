'use client';
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

/**
 * VisitCounter — display only.
 * Reads the current count via GET. The homepage is responsible for
 * incrementing (POST) so the counter only goes up on homepage visits.
 */
export default function VisitCounter() {
  const [count, setCount] = useState(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    fetch('/api/visits')
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === 'number') setCount(data.count);
      })
      .catch(() => {});
  }, []);

  // Animate the counter rolling up
  useEffect(() => {
    if (count === null) return;
    if (count === 0) { setDisplayed(0); return; }

    const duration = 1200;
    const steps = 40;
    const increment = count / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), count);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [count]);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-gray-500 text-xs">
      <Eye size={12} className="text-hitm-gold shrink-0" />
      <span>
        <span className="text-hitm-gold font-semibold tabular-nums">
          {displayed.toLocaleString('en-IN')}
        </span>
        {' '}visits
      </span>
    </span>
  );
}

