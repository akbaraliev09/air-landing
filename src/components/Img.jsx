import { useState } from 'react';

export default function Img({ src, alt = '', className = '', hideOnError = false, fallback = null }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallback) return fallback;
    if (hideOnError) return null;
    return (
      <div className={`img-missing ${className}`} role="img" aria-label={alt}>
        Add image: public/images/{src.split('/').pop()}
      </div>
    );
  }

  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
