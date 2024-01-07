import { type ReactNode } from 'react';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'table'
  | 'list'
  | 'inline-code'
  | 'lead'
  | 'large'
  | 'small'
  | 'muted';

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'span'
  | 'em'
  | 'strong'
  | 'p'
  | 'label'
  | 'div'
  | 'figcaption'
  | 'li'
  | 'ul'
  | 'ol'
  | 'pre'
  | 'code'
  | 'blockquote'
  | 'small';

export interface TypographyProperties {
  variant: TypographyVariant;
  text?: string;
  htmlFor?: string;
  component: TypographyElement;
  className?: string;
  children?: ReactNode | ReactNode[];
}

/**
  - Use typography to visualize text
**/
export function Typography({
  variant = 'h1',
  component,
  text,
  className,
  htmlFor,
  children,
}: TypographyProperties): React.ReactNode {
  const TextWrapper = component;

  return (
    <TextWrapper
      className={`${variant}${className ? ` ${className}` : ''}`}
      htmlFor={htmlFor}
    >
      {children ?? text}
    </TextWrapper>
  );
}
