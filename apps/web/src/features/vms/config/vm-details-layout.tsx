// import { Layouts } from '@/utils/layout-item'

// export const standardLayouts: Layouts = {
//   xl: [
//     // Top left row: Team, Location, Last Updated (side by side)
//     { i: 'team', x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'location', x: 2, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'last-updated', x: 4, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     // Second row: Configuration and Memory (side by side)
//     { i: 'configuration', x: 0, y: 3, w: 3, h: 4, minW: 3, minH: 4 },
//     { i: 'memory', x: 3, y: 3, w: 3, h: 4, minW: 2, minH: 3 },
//     // Third row: CPU and Disk (side by side)
//     { i: 'cpu', x: 0, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     { i: 'disk', x: 3, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     // Right side: Control Panel at top
//     { i: 'control-panel', x: 6, y: 0, w: 3, h: 6, minW: 3, minH: 6 },
//     // Right side: Info Card in middle
//     { i: 'info', x: 6, y: 6, w: 3, h: 7, minW: 3, minH: 6 },
//     // Right side: Tags Card at bottom
//     { i: 'tags', x: 6, y: 13, w: 3, h: 5, minW: 3, minH: 4 },
//   ],
//   lg: [
//     // Top left row: Team, Location, Last Updated (side by side)
//     { i: 'team', x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'location', x: 2, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'last-updated', x: 4, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     // Second row: Configuration and Memory (side by side)
//     { i: 'configuration', x: 0, y: 3, w: 3, h: 4, minW: 3, minH: 4 },
//     { i: 'memory', x: 3, y: 3, w: 3, h: 4, minW: 2, minH: 3 },
//     // Third row: CPU and Disk (side by side)
//     { i: 'cpu', x: 0, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     { i: 'disk', x: 3, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     // Right side: Control Panel at top
//     { i: 'control-panel', x: 6, y: 0, w: 3, h: 6, minW: 3, minH: 6 },
//     // Right side: Info Card in middle
//     { i: 'info', x: 6, y: 6, w: 3, h: 7, minW: 3, minH: 6 },
//     // Right side: Tags Card at bottom
//     { i: 'tags', x: 6, y: 13, w: 3, h: 5, minW: 3, minH: 4 },
//   ],
//   md: [
//     // Top left row: Team, Location, Last Updated (side by side)
//     { i: 'team', x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'location', x: 2, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     { i: 'last-updated', x: 4, y: 0, w: 2, h: 3, minW: 2, minH: 3 },
//     // Second row: Configuration and Memory (side by side)
//     { i: 'configuration', x: 0, y: 3, w: 3, h: 4, minW: 3, minH: 4 },
//     { i: 'memory', x: 3, y: 3, w: 3, h: 4, minW: 2, minH: 3 },
//     // Third row: CPU and Disk (side by side)
//     { i: 'cpu', x: 0, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     { i: 'disk', x: 3, y: 7, w: 3, h: 6, minW: 3, minH: 5 },
//     // Right side: Control Panel at top
//     { i: 'control-panel', x: 6, y: 0, w: 3, h: 6, minW: 3, minH: 6 },
//     // Right side: Info Card in middle
//     { i: 'info', x: 6, y: 6, w: 3, h: 7, minW: 3, minH: 6 },
//     // Right side: Tags Card at bottom
//     { i: 'tags', x: 6, y: 13, w: 3, h: 5, minW: 3, minH: 4 },
//   ],
//   sm: [
//     // Top row: Team, Location, Last Updated (stacked on smaller screens)
//     { i: 'team', x: 0, y: 0, w: 4, h: 3, minW: 3, minH: 3 },
//     { i: 'location', x: 4, y: 0, w: 4, h: 3, minW: 3, minH: 3 },
//     { i: 'last-updated', x: 8, y: 0, w: 4, h: 3, minW: 3, minH: 3 },
//     // Second row: Configuration and Memory
//     { i: 'configuration', x: 0, y: 3, w: 6, h: 4, minW: 4, minH: 4 },
//     { i: 'memory', x: 6, y: 3, w: 6, h: 4, minW: 4, minH: 3 },
//     // Third row: CPU and Disk
//     { i: 'cpu', x: 0, y: 7, w: 6, h: 6, minW: 4, minH: 5 },
//     { i: 'disk', x: 6, y: 7, w: 6, h: 6, minW: 4, minH: 5 },
//     // Fourth row: Control Panel (full width)
//     { i: 'control-panel', x: 0, y: 13, w: 12, h: 6, minW: 6, minH: 6 },
//     // Fifth row: Info Card (full width)
//     { i: 'info', x: 0, y: 19, w: 12, h: 7, minW: 8, minH: 6 },
//     // Sixth row: Tags Card (full width)
//     { i: 'tags', x: 0, y: 26, w: 12, h: 5, minW: 8, minH: 4 },
//   ],
//   xs: [
//     // Mobile: All cards stacked vertically
//     { i: 'team', x: 0, y: 0, w: 12, h: 3, minW: 6, minH: 3 },
//     { i: 'location', x: 0, y: 3, w: 12, h: 3, minW: 6, minH: 3 },
//     { i: 'last-updated', x: 0, y: 6, w: 12, h: 3, minW: 6, minH: 3 },
//     { i: 'configuration', x: 0, y: 9, w: 12, h: 4, minW: 8, minH: 4 },
//     { i: 'memory', x: 0, y: 13, w: 12, h: 4, minW: 8, minH: 3 },
//     { i: 'cpu', x: 0, y: 17, w: 12, h: 6, minW: 8, minH: 5 },
//     { i: 'disk', x: 0, y: 23, w: 12, h: 6, minW: 8, minH: 5 },
//     { i: 'control-panel', x: 0, y: 29, w: 12, h: 6, minW: 8, minH: 6 },
//     { i: 'info', x: 0, y: 35, w: 12, h: 7, minW: 8, minH: 6 },
//     { i: 'tags', x: 0, y: 42, w: 12, h: 5, minW: 8, minH: 4 },
//   ],
// }
