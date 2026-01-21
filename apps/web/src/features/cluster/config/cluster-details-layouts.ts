import { ItemsLayouts } from '@/utils/layout-item'

export const standardLayouts: ItemsLayouts = {
  xl: [
    { i: 'memory', x: 6, y: 0, w: 2, h: 12, minW: 1, minH: 12 },
    { i: 'tools', x: 4, y: 0, w: 2, h: 12, minW: 1, minH: 12 },
    { i: 'info', x: 0, y: 0, w: 4, h: 12, minW: 2, minH: 12 },
    { i: 'versions', x: 8, y: 0, w: 2, h: 12, minW: 1, minH: 12 },
    { i: 'observed', x: 10, y: 6, w: 2, h: 6, minW: 1, minH: 6 },
    { i: 'prices', x: 10, y: 0, w: 2, h: 6, minW: 2, minH: 6 },
  ],
  lg: [
    { i: 'memory', x: 6, y: 0, w: 3, h: 10, minW: 2, minH: 10 },
    { i: 'tools', x: 9, y: 0, w: 3, h: 10, minW: 3, minH: 6 },
    { i: 'info', x: 0, y: 0, w: 6, h: 10, minW: 6, minH: 10 },
    { i: 'versions', x: 0, y: 10, w: 4, h: 9, minW: 4, minH: 7 },
    { i: 'observed', x: 4, y: 10, w: 4, h: 9, minW: 4, minH: 5 },
    { i: 'prices', x: 8, y: 10, w: 4, h: 9, minW: 4, minH: 4 },
  ],
  md: [
    { i: 'memory', x: 4, y: 10, w: 4, h: 10, minW: 3, minH: 8 },
    { i: 'tools', x: 8, y: 0, w: 4, h: 8, minW: 4, minH: 6 },
    { i: 'info', x: 0, y: 0, w: 8, h: 10, minW: 8, minH: 10 },
    { i: 'versions', x: 0, y: 10, w: 4, h: 10, minW: 3, minH: 9 },
    { i: 'observed', x: 8, y: 10, w: 4, h: 7, minW: 3, minH: 5 },
    { i: 'prices', x: 8, y: 8, w: 4, h: 5, minW: 3, minH: 4 },
  ],
  sm: [
    { i: 'memory', x: 0, y: 10, w: 6, h: 10, minW: 6, minH: 10 },
    { i: 'tools', x: 6, y: 10, w: 6, h: 8, minW: 6, minH: 6 },
    { i: 'info', x: 0, y: 0, w: 12, h: 10, minW: 12, minH: 10 },
    { i: 'versions', x: 0, y: 20, w: 6, h: 9, minW: 6, minH: 9 },
    { i: 'observed', x: 6, y: 23, w: 6, h: 6, minW: 6, minH: 6 },
    { i: 'prices', x: 6, y: 18, w: 6, h: 5, minW: 6, minH: 5 },
  ],
  xs: [
    { i: 'memory', x: 0, y: 10, w: 6, h: 10, minW: 6, minH: 10 },
    { i: 'tools', x: 6, y: 10, w: 6, h: 8, minW: 6, minH: 6 },
    { i: 'info', x: 0, y: 0, w: 12, h: 10, minW: 12, minH: 10 },
    { i: 'versions', x: 0, y: 20, w: 6, h: 9, minW: 6, minH: 9 },
    { i: 'observed', x: 6, y: 23, w: 6, h: 6, minW: 6, minH: 6 },
    { i: 'prices', x: 6, y: 18, w: 6, h: 5, minW: 6, minH: 5 },
  ],
}
