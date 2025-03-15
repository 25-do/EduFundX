import type {
  LineChartProps,
  LineProps,
  XAxisProps,
  YAxisProps,
  CartesianGridProps,
  TooltipProps,
  ResponsiveContainerProps,
} from "recharts"
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
} from "recharts"

export const LineChart = (props: LineChartProps) => {
  return <RechartsLineChart {...props} />
}

export const Line = (props: LineProps) => {
  return <RechartsLine {...props} />
}

export const XAxis = (props: XAxisProps) => {
  return <RechartsXAxis {...props} />
}

export const YAxis = (props: YAxisProps) => {
  return <RechartsYAxis {...props} />
}

export const CartesianGrid = (props: CartesianGridProps) => {
  return <RechartsCartesianGrid {...props} />
}

export const Tooltip = (props: TooltipProps) => {
  return <RechartsTooltip {...props} />
}

export const ResponsiveContainer = (props: ResponsiveContainerProps) => {
  return <RechartsResponsiveContainer {...props} />
}

