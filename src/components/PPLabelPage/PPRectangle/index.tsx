import React from 'react';
import PPToolBarButton from '../PPToolBarButton';

export type PPBrushProps = {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  imgSrc?: string;
};

const Component: React.FC<PPBrushProps> = (props) => {
  return (
    <PPToolBarButton
      active={props.active}
      imgSrc={props.imgSrc || './pics/buttons/rectangle.png'}
      onClick={props.onClick}
    >
      {props.children}
    </PPToolBarButton>
  );
};
export default Component;
