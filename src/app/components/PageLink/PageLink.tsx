import React from 'react';
import cn from 'classnames';

import style from './PageLink.module.css'

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({ 
  className,
  children,
  active,
  disabled,
  ...props
}: Props) {
  const customerClassName = cn(style['page-link'], className, { active, disabled });

  if (disabled) {
    return <span className={customerClassName}>{children}</span>
  }

  return (
    <a
      {...props}
      className={customerClassName}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </a>
  )
}
