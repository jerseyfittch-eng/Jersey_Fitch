import { useState, useEffect } from 'react';

function parsePath() {
  const hash = window.location.hash.slice(1);
  return hash || '/';
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(parsePath);

  useEffect(() => {
    const handle = () => {
      setCurrentPath(parsePath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);

  return { currentPath };
}

export function navigate(path: string) {
  window.location.hash = path;
}
