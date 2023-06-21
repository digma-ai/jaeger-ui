const MIN_ZOOM_LEVEL = 0.7;
const MAX_ZOOM_LEVEL = 1.5;
const ZOOM_FACTOR = 0.1;

export default class ZoomManager {
  zoomLevel: number;

  constructor() {
    this.zoomLevel = document.body.style.zoom || 1;
  }

  updateStyles = () => {
    document.body.style.zoom = this.zoomLevel;
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
