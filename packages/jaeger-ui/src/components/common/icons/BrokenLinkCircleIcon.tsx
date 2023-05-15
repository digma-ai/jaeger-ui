import React from 'react';
import { useIconProps } from './hooks';
import { IIconProps } from './types';

const BrokenLinkCircleIconComponent = (props: IIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="36" fill="#F5F5F5" />
      <path
        d="M49.2217 23.2783C48.0049 22.0617 46.3553 21.3772 44.6346 21.375C42.9139 21.3727 41.2626 22.0527 40.0425 23.2661L37.6761 25.7462C37.3734 26.0291 36.9742 26.1857 36.5599 26.1841C36.1457 26.1824 35.7477 26.0226 35.4473 25.7372C35.147 25.4519 34.9669 25.0627 34.944 24.6491C34.921 24.2354 35.0569 23.8286 35.3239 23.5119L37.7045 21.0155C37.7128 21.0062 37.7216 20.9973 37.7309 20.9891C39.5644 19.1852 42.0365 18.1789 44.6086 18.1894C47.1806 18.1998 49.6444 19.2262 51.4631 21.045C53.2819 22.8637 54.3083 25.3275 54.3188 27.8996C54.3292 30.4717 53.3229 32.9437 51.5191 34.7772C51.5108 34.7865 51.502 34.7953 51.4927 34.8036L48.9963 37.1842C48.6795 37.4512 48.2727 37.5871 47.8591 37.5641C47.4454 37.5412 47.0562 37.3612 46.7709 37.0608C46.4856 36.7604 46.3257 36.3625 46.3241 35.9482C46.3224 35.5339 46.479 35.1347 46.7619 34.832L49.242 32.4656C50.4568 31.2442 51.137 29.5904 51.1332 27.8677C51.1294 26.1451 50.4419 24.4944 49.2217 23.2783ZM35.3239 46.2537L32.9575 48.7339C31.7326 49.9235 30.0889 50.5833 28.3815 50.5709C26.6741 50.5584 25.0401 49.8746 23.8328 48.6672C22.6254 47.4599 21.9416 45.8259 21.9291 44.1185C21.9167 42.4111 22.5765 40.7674 23.7661 39.5425L26.2462 37.1761C26.5291 36.8734 26.6857 36.4742 26.6841 36.0599C26.6824 35.6457 26.5226 35.2477 26.2372 34.9473C25.9519 34.647 25.5627 34.4669 25.1491 34.444C24.7354 34.421 24.3286 34.5569 24.0119 34.8239L21.5073 37.2045C21.498 37.2128 21.4892 37.2216 21.4809 37.2309C19.6771 39.0644 18.6708 41.5365 18.6812 44.1086C18.6917 46.6806 19.7181 49.1444 21.5369 50.9631C23.3556 52.7819 25.8194 53.8083 28.3914 53.8188C30.9635 53.8292 33.4356 52.8229 35.2691 51.0191C35.2784 51.0108 35.2872 51.002 35.2955 50.9927L37.6761 48.4963C37.8379 48.345 37.9671 48.1622 38.0558 47.9592C38.1444 47.7562 38.1906 47.5372 38.1915 47.3156C38.1924 47.0941 38.148 46.8747 38.061 46.671C37.974 46.4673 37.8463 46.2835 37.6857 46.1309C37.525 45.9783 37.3349 45.8602 37.127 45.7838C36.9191 45.7074 36.6977 45.6743 36.4765 45.6866C36.2553 45.6988 36.039 45.7562 35.8408 45.8551C35.6426 45.9541 35.4667 46.0925 35.3239 46.2619V46.2537ZM52.75 40.875H47.875C47.444 40.875 47.0307 41.0462 46.726 41.351C46.4212 41.6557 46.25 42.069 46.25 42.5C46.25 42.931 46.4212 43.3443 46.726 43.649C47.0307 43.9538 47.444 44.125 47.875 44.125H52.75C53.181 44.125 53.5943 43.9538 53.899 43.649C54.2038 43.3443 54.375 42.931 54.375 42.5C54.375 42.069 54.2038 41.6557 53.899 41.351C53.5943 41.0462 53.181 40.875 52.75 40.875ZM20.25 31.125H25.125C25.556 31.125 25.9693 30.9538 26.274 30.649C26.5788 30.3443 26.75 29.931 26.75 29.5C26.75 29.069 26.5788 28.6557 26.274 28.351C25.9693 28.0462 25.556 27.875 25.125 27.875H20.25C19.819 27.875 19.4057 28.0462 19.101 28.351C18.7962 28.6557 18.625 29.069 18.625 29.5C18.625 29.931 18.7962 30.3443 19.101 30.649C19.4057 30.9538 19.819 31.125 20.25 31.125ZM43 45.75C42.569 45.75 42.1557 45.9212 41.851 46.226C41.5462 46.5307 41.375 46.944 41.375 47.375V52.25C41.375 52.681 41.5462 53.0943 41.851 53.399C42.1557 53.7038 42.569 53.875 43 53.875C43.431 53.875 43.8443 53.7038 44.149 53.399C44.4538 53.0943 44.625 52.681 44.625 52.25V47.375C44.625 46.944 44.4538 46.5307 44.149 46.226C43.8443 45.9212 43.431 45.75 43 45.75ZM30 26.25C30.431 26.25 30.8443 26.0788 31.149 25.774C31.4538 25.4693 31.625 25.056 31.625 24.625V19.75C31.625 19.319 31.4538 18.9057 31.149 18.601C30.8443 18.2962 30.431 18.125 30 18.125C29.569 18.125 29.1557 18.2962 28.851 18.601C28.5462 18.9057 28.375 19.319 28.375 19.75V24.625C28.375 25.056 28.5462 25.4693 28.851 25.774C29.1557 26.0788 29.569 26.25 30 26.25Z"
        fill={color}
      />
    </svg>
  );
};

export const BrokenLinkCircleIcon = React.memo(BrokenLinkCircleIconComponent);
