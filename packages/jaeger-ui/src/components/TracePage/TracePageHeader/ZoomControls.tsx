import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ButtonGroup from 'antd/lib/button/button-group';

const MIN_ZOOM_LEVEL = 0.7;
const MAX_ZOOM_LEVEL = 1.5;
const ZOOM_FACTOR = 0.1;

type ZoomControlsProps = {
  className?: string;
};

const ZoomControls = (props: ZoomControlsProps) => {
  const [zoom, setZoom] = useState(document.body.style.zoom || 1);

  useEffect(() => {
    document.body.style.zoom = zoom;
  }, [zoom]);

  return (
    <ButtonGroup className={props.className}>
      <Button
        onClick={() => {
          setZoom(Math.min(zoom + ZOOM_FACTOR, MAX_ZOOM_LEVEL));
        }}
        htmlType="button"
        icon="zoom-in"
      />
      <Button
        onClick={() => {
          setZoom(Math.max(zoom - ZOOM_FACTOR, MIN_ZOOM_LEVEL));
        }}
        htmlType="button"
        icon="zoom-out"
      />
    </ButtonGroup>
  );
};

export default ZoomControls;
