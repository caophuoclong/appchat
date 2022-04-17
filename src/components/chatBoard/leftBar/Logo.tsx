import * as React from 'react';
import { LogoIcon } from '../../../assets/icons';

export interface ILogoProps {
  className: string;
}

export function Logo(props: ILogoProps) {
  return (
    <div className={props.className}>
      <LogoIcon />
      <span className="text-glareBlack text-3xl font-semibold">CyberChat</span>
    </div>
  );
}
