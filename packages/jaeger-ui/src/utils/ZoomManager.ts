const MIN_ZOOM_LEVEL = 0.7;
const MAX_ZOOM_LEVEL = 1.5;
const ZOOM_FACTOR = 0.1;

interface IChromeCSSStyleDeclaration extends CSSStyleDeclaration {
  zoom: number | string;
}

export default class ZoomManager {
  zoomLevel: number;

  constructor() {
    this.zoomLevel =
      typeof (document.body.style as IChromeCSSStyleDeclaration).zoom === 'number'
        ? ((document.body.style as IChromeCSSStyleDeclaration).zoom as number)
        : 1;
  }

  updateStyles = () => {
    (document.body.style as IChromeCSSStyleDeclaration).zoom = this.zoomLevel;
  };

  zoomIn = () => {
    this.zoomLevel = Math.min(this.zoomLevel + ZOOM_FACTOR, MAX_ZOOM_LEVEL);
    this.updateStyles();
  };

  zoomOut = () => {
    this.zoomLevel = Math.max(this.zoomLevel - ZOOM_FACTOR, MIN_ZOOM_LEVEL);
    this.updateStyles();
  };
}
