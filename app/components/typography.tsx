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
  readonly variant: TypographyVariant;
  text?: string;
  htmlFor?: string;
  component: TypographyElement;
  className?: string;
  children?: ReactNode | Array<ReactNode>;
}

/**
  - Use typography to visualize text
**/
export function Typography(properties: Readonly<TypographyProperties>): React.ReactNode {
  const { variant, component, text, className, htmlFor, children } = properties;

  const TextWrapper = component;

  return (
    <TextWrapper htmlFor={htmlFor} className={`${variant ?? 'h1'}${className ? ' ' + className : ''}`}>
      {children ?? text}
    </TextWrapper>
  );
}
