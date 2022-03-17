import * as React from 'react';

export interface IModalOptionsProps {
    className: string;
}

export function ModalOptions (props: IModalOptionsProps) {
  return (
    <div id="optionModal" className={props.className}>
      
    </div>
  );
}
