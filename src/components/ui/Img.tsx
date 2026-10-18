import { useState, type ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { alt: string };

/** Image with a graceful tonal fallback if the file is missing. */
export function Img({ className = '', alt, loading = 'lazy', ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`img-fallback ${className}`} role="img" aria-label={alt} />;
  }

  return (
    <img
      {...rest}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
