import { Button } from 'antd';
import React, { useContext } from 'react';
import ButtonGroup from 'antd/lib/button/button-group';
import { ZoomContext } from '../../../Contexts';

type ZoomControlsProps = {
  className?: string;
};

const ZoomControls = (props: ZoomControlsProps) => {
  const zoomManager = useContext(ZoomContext);

  return (
    <ButtonGroup className={props.className}>
      <Button
        onClick={() => {
          zoomManager?.zoomOut();
        }}
        htmlType="button"
        icon="zoom-out"
      />
      <Button
        onClick={() => {
          zoomManager?.zoomIn();
        }}
        htmlType="button"
        icon="zoom-in"
      />
    </ButtonGroup>
  );
};

export default ZoomControls;
