'use client'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/shadcn/chart'
import { CountMap } from '@/features/cluster/utils/cluster'
import { type Breakpoint, useBreakpoint } from '@/hooks/use-breakpoints'
import { cn } from '@/utils/clsxm'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

interface PageViewProps {
  className?: string
  providerCount: CountMap
  datacenterCount: CountMap
  azCount: CountMap
  countryCount: CountMap
  regionCount: CountMap
  workspaceCount: CountMap
  environmentCount: CountMap
  kubernetesVersionCount: CountMap
  nhnToolVersionCount: CountMap
  serviceIdCount: CountMap
  statusCount: CountMap
}

interface ChartProps {
  title: string
  data: CountMap
  className?: string
  metricLabel: string
}

interface HorizontalChartProps extends ChartProps {
  compact?: boolean
}

interface ChartSpec {
  key: string
  title: string
  metricLabel: string
  data: CountMap
}

const makeChartConfig = (label: string) =>
  ({
    count: {
      label,
      color: '#0c8aca',
    },
  }) satisfies ChartConfig

const wFullStyling = 'w-full mx-auto'

type SpanRule = [minCategories: number, spanClass: string]
const spanFor = (rules: SpanRule[], categories: number) =>
  rules.find(([minCategories]) => categories >= minCategories)?.[1] ?? 'col-span-8'
type Layout = { kind: 'stacked' } | { kind: 'grid'; compact: boolean; horizontalThreshold: number; spans: SpanRule[] }
type GridLayout = Extract<Layout, { kind: 'grid' }>

const ROW_H = 22
const MIN_H = 140

const stacked: Layout = { kind: 'stacked' }
const mdGrid: Layout = {
  kind: 'grid',
  compact: true,
  horizontalThreshold: 24,
  spans: [
    [4, 'col-span-32'],
    [0, 'col-span-16'],
  ],
}
const lgGrid: Layout = {
  kind: 'grid',
  compact: false,
  horizontalThreshold: 128,
  spans: [
    [12, 'col-span-32'],
    [9, 'col-span-24'],
    [6, 'col-span-16'],
    [0, 'col-span-8'],
  ],
}
const xlGrid: Layout = {
  kind: 'grid',
  compact: false,
  horizontalThreshold: 128,
  spans: [
    [15, 'col-span-32'],
    [12, 'col-span-24'],
    [9, 'col-span-16'],
    [0, 'col-span-8'],
  ],
}
const xl2Grid: Layout = {
  kind: 'grid',
  compact: false,
  horizontalThreshold: 128,
  spans: [
    [18, 'col-span-32'],
    [15, 'col-span-24'],
    [12, 'col-span-16'],
    [6, 'col-span-8'],
    [0, 'col-span-6'],
  ],
}
const xl3Grid: Layout = {
  kind: 'grid',
  compact: false,
  horizontalThreshold: 192,
  spans: [
    [21, 'col-span-32'],
    [18, 'col-span-24'],
    [15, 'col-span-16'],
    [6, 'col-span-10'],
    [0, 'col-span-8'],
  ],
}

const layoutByBreakpoint: Record<Breakpoint, Layout> = {
  xs: stacked,
  sm: stacked,
  md: mdGrid,
  lg: lgGrid,
  xl: xlGrid,
  '2xl': xl2Grid,
  '3xl': xl3Grid,
  '4xl': xl3Grid,
  '5xl': xl3Grid,
  '6xl': xl3Grid,
}

const VerticalChart = ({ title, data, className, metricLabel }: ChartProps) => {
  const chartData = Array.from(data, ([version, count]) => ({ version, count }))
  const rows = chartData.length
  const chartH = Math.max(MIN_H, rows * ROW_H)
  const chartConfig = makeChartConfig(metricLabel)

  return (
    <div className={cn('flex flex-col', wFullStyling, className)}>
      <span className='flex items-center'>
        <h2 className={cn('text-lg font-medium', 'mt-4 mb-2')}>{title}</h2>
      </span>
      <div className={cn('bg-gray-100 rounded-lg w-full min-w-0')}>
        <ChartContainer config={chartConfig} className='w-full min-w-0' style={{ height: chartH }}>
          <BarChart accessibilityLayer data={chartData} layout='vertical' margin={{ left: -54 }}>
            <XAxis type='number' dataKey='count' hide />
            <YAxis type='category' tickLine axisLine tickFormatter={() => ''} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className='min-w-56' hideLabel />} />
            <Bar dataKey='count' fill='var(--color-count)' radius={4} barSize={36}>
              <LabelList
                dataKey='version'
                position='insideLeft'
                className='fill-black'
                fontSize={12}
                formatter={(v: unknown) => String(v).replaceAll(' ', '\u00A0')}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

const HorizontalChart = ({ title, data, metricLabel, className, compact = false }: HorizontalChartProps) => {
  const chartData = Array.from(data, ([version, count]) => ({ version, count }))
  const chartConfig = makeChartConfig(metricLabel)

  return (
    <div className={cn('min-w-0 w-full', className)}>
      <span className='flex items-center'>
        <h2 className={cn('text-lg font-medium', 'mt-4 mb-2', 'sm:mt-4 sm:mb-4')}>{title}</h2>
      </span>
      <ChartContainer config={chartConfig} className={cn('h-128 w-full max-w-full overflow-hidden min-w-0')}>
        <BarChart accessibilityLayer layout='horizontal' data={chartData} margin={{ left: -30 }}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey='version'
            tickLine={false}
            tickMargin={5}
            textAnchor='end'
            interval={0}
            angle={compact ? -90 : -45}
            height={compact ? 80 : 120}
            fontSize={compact ? 10 : undefined}
            tickFormatter={compact ? (v: string) => (v.length > 7 ? `${v.slice(0, 7)}…` : v) : undefined}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent className='min-w-56' />} />
          <Bar dataKey='count' fill='var(--color-count)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

const GridChart = ({ chart, layout }: { chart: ChartSpec; layout: GridLayout }) =>
  chart.data.size > layout.horizontalThreshold ? (
    <VerticalChart
      title={chart.title}
      data={chart.data}
      metricLabel={chart.metricLabel}
      className='col-span-32 min-w-0'
    />
  ) : (
    <HorizontalChart
      title={chart.title}
      data={chart.data}
      metricLabel={chart.metricLabel}
      compact={layout.compact}
      className={spanFor(layout.spans, chart.data.size)}
    />
  )

/**
 * Renders the statistics page view, displaying a welcome message and charts for various version data.
 *
 * @param {string} className - Optional additional CSS class names to apply to the root container.
 * @param {CountMap} providerCount - map containing a key and the count
 * @param {CountMap} datacenterCount - map containing a key and the count
 * @param {CountMap} azCount - map containing a key and the count
 * @param {CountMap} countryCount - map containing a key and the count
 * @param {CountMap} regionCount - map containing a key and the count
 * @param {CountMap} workspaceCount - map containing a key and the count
 * @param {CountMap} environmentCount - map containing a key and the count
 * @param {CountMap} kubernetesVersionCount - map containing a key and the count
 * @param {CountMap} nhnToolVersionCount - map containing a key and the count
 * @param {CountMap} statusCount - map containing a key and the count
 */
export const PageView = ({
  className,
  providerCount,
  datacenterCount,
  azCount,
  countryCount,
  regionCount,
  workspaceCount,
  environmentCount,
  kubernetesVersionCount,
  nhnToolVersionCount,
  statusCount,
}: PageViewProps) => {
  const layout = layoutByBreakpoint[useBreakpoint()]

  const charts: ChartSpec[] = (
    [
      { key: 'statuses', title: 'Statuses', metricLabel: 'status', data: statusCount },
      { key: 'providers', title: 'Providers', metricLabel: 'provider', data: providerCount },
      { key: 'availability-zones', title: 'Availability zones', metricLabel: 'availability zone', data: azCount },
      { key: 'countries', title: 'Countries', metricLabel: 'country', data: countryCount },
      { key: 'regions', title: 'Regions', metricLabel: 'region', data: regionCount },
      { key: 'environments', title: 'Environments', metricLabel: 'environment', data: environmentCount },
      { key: 'datacenters', title: 'Datacenters', metricLabel: 'datacenter', data: datacenterCount },
      {
        key: 'kubernetes-versions',
        title: 'Kubernetes versions',
        metricLabel: 'Kubernetes version',
        data: kubernetesVersionCount,
      },
      {
        key: 'nhn-tooling-versions',
        title: 'NHN tooling versions',
        metricLabel: 'NHN tooling version',
        data: nhnToolVersionCount,
      },
      { key: 'workspaces', title: 'Workspaces', metricLabel: 'workspace', data: workspaceCount },
    ] satisfies ChartSpec[]
  ).filter((chart) => chart.data?.size)

  return (
    <div className={className}>
      <div className={cn('my-6 px-4', 'sm:px-12')}>
        {layout.kind === 'stacked' ? (
          charts.map((chart) => (
            <VerticalChart key={chart.key} title={chart.title} data={chart.data} metricLabel={chart.metricLabel} />
          ))
        ) : (
          <div className='grid grid-cols-32 gap-x-6 gap-y-8'>
            {charts.map((chart) => (
              <GridChart key={chart.key} chart={chart} layout={layout} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
