import * as React from 'react';
import { SettingModal } from '../SettingsModal';

export interface IModalOptionsProps {
    className: string;
}

export function ModalOptions (props: IModalOptionsProps) {
  return (
    <div id="optionModal" className={props.className}>
      <SettingModal/>
    </div>
  );
}
