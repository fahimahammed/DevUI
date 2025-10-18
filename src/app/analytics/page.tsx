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
import { BarChart3, Download, FileSearch, Loader2, PieChart as PieChartIcon, RefreshCw } from 'lucide-react';
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
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to clear corrupted data
  const clearCorruptedData = () => {
    localStorage.removeItem('componentAnalytics');
    setAnalyticsData([]);
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    try {
      const data = typeof window !== 'undefined' ? localStorage.getItem('componentAnalytics') : null;
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Parsed analytics data:', parsedData, 'Type:', typeof parsedData, 'Is Array:', Array.isArray(parsedData));
        // Ensure parsedData is an array
        if (Array.isArray(parsedData)) {
          setAnalyticsData(parsedData);
        } else {
          console.warn('Analytics data is not an array, initializing with empty array. Data:', parsedData);
          setAnalyticsData([]);
        }
      } else {
        // Add sample data if no real data exists
        const sampleData: AnalyticsEvent[] = [
          {
            component: "Button",
            event: "copy",
            theme: "dark",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          },
          {
            component: "Button",
            event: "copy",
            theme: "light",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          },
          {
            component: "Input",
            event: "copy",
            theme: "dark",
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          },
          {
            component: "Card",
            event: "copy",
            theme: "light",
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          },
          {
            component: "Button",
            event: "copy",
            theme: "dark",
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          },
          {
            component: "Dialog",
            event: "copy",
            theme: "light",
            timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
          },
          {
            component: "Select",
            event: "copy",
            theme: "dark",
            timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
          },
          {
            component: "Badge",
            event: "copy",
            theme: "light",
            timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
          },
        ];
        setAnalyticsData(sampleData);
      }
    } catch (error) {
      // keep console.error for debugging in dev
      // eslint-disable-next-line no-console
      console.error('Error reading analytics data:', error);
      // Set empty array as fallback
      setAnalyticsData([]);
    } finally {
      setIsLoading(false);
    }
  }, [refreshKey]);

  // Filter and aggregate data for charts
  console.log('analyticsData before filter:', analyticsData, 'Type:', typeof analyticsData, 'Is Array:', Array.isArray(analyticsData));
  const filteredData = (Array.isArray(analyticsData) ? analyticsData : []).filter((event) => {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight animate-in fade-in duration-500">
            Analytics Dashboard
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Total Events: {Array.isArray(analyticsData) ? analyticsData.length : 0}</span>
            <span>Components: {Array.isArray(analyticsData) ? new Set(analyticsData.map(d => d.component)).size : 0}</span>
          </div>
        </div>

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
                    {Array.isArray(analyticsData) ? [...new Set(analyticsData.map((d) => d.component))].map((comp) => (
                      <SelectItem key={comp} value={comp}>
                        {comp}
                      </SelectItem>
                    )) : null}
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
            
            {/* Sample Data Notice */}
            {Array.isArray(analyticsData) && analyticsData.length > 0 && analyticsData[0]?.component === "Button" && analyticsData[0]?.timestamp.includes("2024") && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  📊 <strong>Demo Mode:</strong> This is sample data. Copy some components from the home page to see real analytics!
                </p>
                <button
                  className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => {
                    localStorage.removeItem('componentAnalytics');
                    window.location.reload();
                  }}
                >
                  Clear sample data
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {Array.isArray(analyticsData) && analyticsData.length > 0 && (
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analyticsData
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .slice(0, 5)
                  .map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">{event.component}</span>
                        <span className="text-sm text-muted-foreground">copied</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
                        }`}>
                          {event.theme}
                        </span>
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRefreshKey(prev => prev + 1)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  title="Refresh data"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={clearCorruptedData}
                  className="p-2 hover:bg-muted rounded-md transition-colors text-red-500 hover:text-red-700"
                  title="Clear all data"
                >
                  🗑️
                </button>
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
              </div>
            </CardHeader>

            <CardContent>
              {copyChartData.length === 0 ? (
                <div className="flex flex-col gap-y-4 items-center justify-center h-[200px] w-full">
                  <FileSearch className="size-6 text-muted-foreground" />
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground text-sm">No data for this period</p>
                    <p className="text-xs text-muted-foreground/70">
                      Try adjusting your filters or copy some components from the home page
                    </p>
                  </div>
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