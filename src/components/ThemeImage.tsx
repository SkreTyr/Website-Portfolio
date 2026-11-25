import React from 'react';
import { useIsLightMode } from '@/lib/useTheme';

interface ThemeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image used in Dark Mode */
  darkSrc: string;
  /** Image used in Light Mode */
  lightSrc: string;
}

/**
 * Renders a different image depending on the active theme.
 * Light Mode is active when the `dark` class is set on <html>.
 */
export default function ThemeImage({ darkSrc, lightSrc, ...props }: ThemeImageProps) {
  const isLightMode = useIsLightMode();
  return <img src={isLightMode ? lightSrc : darkSrc} {...props} />;
}