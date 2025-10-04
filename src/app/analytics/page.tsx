'use client';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { BarChart3, Download, FileSearch, Loader2, PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsEvent {
  component: string;
  event: string;
  theme: string;
  timestamp: string;
}

const COLORS = ['hsl(var(--primary))', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

/**
 * Analytics Dashboard
 *
 * Notes:
 * - This is a client component (use client) so using localStorage / window is fine.
 * - Animation props are placed onto <Pie>, <Bar>, and <Area> (not the chart wrappers) to satisfy Recharts types.
 */
export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterComponent, setFilterComponent] = useState<string>('all');
  const [filterTheme, setFilterTheme] = useState<string>('all');
  const [filterTime, setFilterTime] = useState<string>('all');
  const [chartType, setChartType] = useState<string>('bar');

  useEffect(() => {
    try {
      const data = typeof window !== 'undefined' ? localStorage.getItem('componentAnalytics') : null;
      if (data) {
        setAnalyticsData(JSON.parse(data));
      }
    } catch (error) {
      // keep console.error for debugging in dev
      // eslint-disable-next-line no-console
      console.error('Error reading analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter and aggregate data for charts
  const filteredData = analyticsData.filter((event) => {
    const componentMatch = filterComponent === 'all' || event.component === filterComponent;
    const themeMatch = filterTheme === 'all' || event.theme === filterTheme;
    const timeMatch =
      filterTime === 'all'
        ? true
        : filterTime === '7days'
        ? new Date(event.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        : filterTime === '30days'
        ? new Date(event.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        : new Date(event.timestamp) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    return componentMatch && themeMatch && timeMatch && event.event === 'copy';
  });

  // Aggregate data for most copied components
  const copyEvents = filteredData.reduce((acc, event) => {
    acc[event.component] = (acc[event.component] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Prepare chart data
  const copyChartData = Object.entries(copyEvents)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 components

  const copyChartDataTop5 = copyChartData.slice(0, 5); // Top 5 components for second Pie chart

  // Determine chart dimensions based on data length
  const isSingleEntry = copyChartData.length === 1;
  const pieWidth = isSingleEntry ? 160 : 220;
  const pieHeight = isSingleEntry ? 160 : 220;
  const chartWidth = isSingleEntry ? 200 : 420;   // <-- reduce from 600 to 420
  const chartHeight = isSingleEntry ? 160 : 220;  // <-- reduce from 300 to 220

  // Calculate max Y value for integer ticks (safe when empty)
  const computedMax = copyChartData.length > 0 ? Math.max(...copyChartData.map((d) => d.value)) : 4;
  const maxYValue = Math.max(computedMax, 4); // ensure at least 4
  const yAxisDomain: [number, number] = [0, Math.ceil(maxYValue)];

  // Export to CSV — safer quoting for fields
  const exportToCSV = () => {
    if (typeof window === 'undefined') return;
    const quote = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
    const headers = ['Component', 'Event', 'Theme', 'Timestamp'].join(',');
    const rows = filteredData.map((event) =>
      [event.component, event.event, event.theme, event.timestamp].map(quote).join(','),
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 dark:from-background dark:to-muted/30 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight animate-in fade-in duration-500">
          Analytics Dashboard
        </h1>

        {/* Filters Card */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-foreground">Filter Insights</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/90 dark:text-foreground/80">Component</label>
                <Select value={filterComponent} onValueChange={setFilterComponent}>
                  <SelectTrigger className="h-10 w-full bg-background/80 hover:bg-background transition-colors duration-200 border-border/50 focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <SelectValue placeholder="Select Component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" key="all">
                      All Components
                    </SelectItem>
                    {[...new Set(analyticsData.map((d) => d.component))].map((comp) => (
                      <SelectItem key={comp} value={comp}>
                        {comp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/90 dark:text-foreground/80">Theme</label>
                <Select value={filterTheme} onValueChange={setFilterTheme}>
                  <SelectTrigger className="h-10 w-full bg-background/80 hover:bg-background transition-colors duration-200 border-border/50 focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" key="all">
                      All Themes
                    </SelectItem>
                    <SelectItem value="light" key="light">
                      Light
                    </SelectItem>
                    <SelectItem value="dark" key="dark">
                      Dark
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/90 dark:text-foreground/80">Time Range</label>
                <Select value={filterTime} onValueChange={setFilterTime}>
                  <SelectTrigger className="h-10 w-full bg-background/80 hover:bg-background transition-colors duration-200 border-border/50 focus:ring-2 focus:ring-primary focus:ring-offset-1">
                    <SelectValue placeholder="Select Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" key="all">
                      All Time
                    </SelectItem>
                    <SelectItem value="7days" key="7days">
                      Last 7 Days
                    </SelectItem>
                    <SelectItem value="30days" key="30days">
                      Last 30 Days
                    </SelectItem>
                    <SelectItem value="90days" key="90days">
                      Last 90 Days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 flex items-end">
                <button
                  className="h-10 w-full bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 shadow-sm"
                  onClick={exportToCSV}
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading ? (
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:justify-between">
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
              <div className="h-9 w-full md:w-32 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Most Copied Components</CardTitle>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger
                  aria-label="Select chart type"
                  className="h-9 w-full md:w-32 bg-background/80 hover:bg-background transition-colors duration-200 border-border/50 focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar" key="bar">
                    <div className="flex items-center">
                      <BarChart3 className="size-4 mr-2 shrink-0" />
                      <p className="line-clamp-1">Bar Chart</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="pie" key="pie">
                    <div className="flex items-center">
                      <PieChartIcon className="size-4 mr-2 shrink-0" />
                      <p className="line-clamp-1">Pie Chart</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="area" key="area">
                    <div className="flex items-center">
                      <BarChart3 className="size-4 mr-2 shrink-0" />
                      <p className="line-clamp-1">Area Chart</p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>

            <CardContent>
              {copyChartData.length === 0 ? (
                <div className="flex flex-col gap-y-4 items-center justify-center h-[200px] w-full">
                  <FileSearch className="size-6 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">No data for this period</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {chartType === 'pie' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Pie Chart 1: Top 10 Components */}
                      <div className="p-4 bg-background rounded-md border border-border/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm w-full">
                        <h3 className="text-sm font-medium text-foreground/90 mb-2">Top 10 Components</h3>
                        <PieChart width={pieWidth} height={pieHeight} className="w-full">
                          <Pie
                            data={copyChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={isSingleEntry ? 80 : 100}
                            innerRadius={isSingleEntry ? 40 : 50}
                            fill={COLORS[0]}
                            label
                            labelLine={true}
                            isAnimationActive={true}
                            animationDuration={600}
                            animationEasing="ease-in-out"
                          >
                            {copyChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              color: 'hsl(var(--foreground))',
                              fontSize: '12px',
                            }}
                          />
                        </PieChart>
                      </div>

                      {/* Pie Chart 2: Top 5 Components */}
                      <div className="p-4 bg-background rounded-md border border-border/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm w-full">
                        <h3 className="text-sm font-medium text-foreground/90 mb-2">Top 5 Components</h3>
                        <PieChart width={pieWidth} height={pieHeight} className="w-full">
                          <Pie
                            data={copyChartDataTop5}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={isSingleEntry ? 80 : 100}
                            innerRadius={isSingleEntry ? 40 : 50}
                            fill={COLORS[0]}
                            label
                            labelLine={true}
                            isAnimationActive={true}
                            animationDuration={600}
                            animationEasing="ease-in-out"
                          >
                            {copyChartDataTop5.map((entry, index) => (
                              <Cell key={`cell-top5-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              color: 'hsl(var(--foreground))',
                              fontSize: '12px',
                            }}
                          />
                        </PieChart>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-background rounded-md border border-border/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-sm w-full">
                      {chartType === 'bar' && (
                        <BarChart width={chartWidth} height={chartHeight} data={copyChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} className="w-full">
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                          <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={yAxisDomain} allowDecimals={false} tickCount={Math.ceil(maxYValue) + 1} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              color: 'hsl(var(--foreground))',
                              fontSize: '12px',
                            }}
                          />
                          <Bar dataKey="value" fill={COLORS[0]} radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={600} animationEasing="ease-in-out" />
                        </BarChart>
                      )}

                      {chartType === 'area' && (
                        <AreaChart width={chartWidth} height={chartHeight} data={copyChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} className="w-full">
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                          <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--foreground))" fontSize={12} domain={yAxisDomain} allowDecimals={false} tickCount={Math.ceil(maxYValue) + 1} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              color: 'hsl(var(--foreground))',
                              fontSize: '12px',
                            }}
                          />
                          <Area type="monotone" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} isAnimationActive={true} animationDuration={600} animationEasing="ease-in-out" />
                        </AreaChart>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}