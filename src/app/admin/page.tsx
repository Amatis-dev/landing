"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Minimal debounce helper
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/analytics", {
          method: "GET",
          headers: { "Accept": "application/json" },
        });
        if (!res.ok) {
          const err = await res.json();
          setError(err.message || "Failed to fetch analytics");
        } else {
          const data = await res.json();
          setStats(data);
        }
      } catch (e: any) {
        setError(e.message || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-8 text-muted-foreground">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-8 text-danger">Error: {error}</div>;
  }

  if (!stats) {
    return <div className="p-8 text-muted-foreground">No data available</div>;
  }

  const topPages = stats.top_pages || [];
  const countries = stats.countries || [];
  const browsers = stats.browsers || {};
  const os = stats.os || {};

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>

      {/* KPIs Section with modern cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="text-muted-foreground text-sm mb-2">Pageviews</div>
          <div className="text-2xl font-bold">{stats.pageviews || 0}</div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-shadow-sm">
          <div className="text-muted-foreground text-sm mb-2">Unique Visitors</div>
          <div className="text-2xl font-bold">{stats.unique_visitors || 0}</div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="text-muted-foreground text-sm mb-2">Sessions</div>
          <div className="text-2xl font-bold">{stats.sessions || 0}</div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="text-muted-foreground text-sm mb-2">Bounce Rate</div>
          <div className="text-2xl font-bold">{Math.round(stats.bounce_rate)}%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Top Pages Bar Chart */}
        <div>
          <h3 className="text-semibold mb-4">Top Pages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPages} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="path" className="domain-text" label={{ value: "Page Path", fontSize: 12 }} />
              <YAxis className="domain-text" label={{ value: "Views", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pageviews" fill="#8884d8" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Countries Pie Chart */}
        <div>
          <h3 className="text-semibold mb-4">Top Countries</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart data={countries} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <Pie dataKey="visitors" fill="#8884d8" />
              <Cell stroke="#fff" strokeWidth={1} />
              <Label
                fill="#fff"
                position="inside"
                textAnchor="middle"
                fontSize={12}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Browsers & OS Charts */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* Browsers Bar Chart */}
        <div>
          <h3 className="text-semibold mb-4">Browsers</h3>
          {Object.entries(browsers).length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(browsers).map(([key, value]) => ({ key, value }))} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="key" className="domain-text" label={{ value: "Browser", fontSize: 12 }} />
                <YAxis className="domain-text" label={{ value: "Visitors", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm">No browser data available</p>
          )}
        </div>

        {/* OS Bar Chart */}
        <div>
          <h3 className="text-semibold mb-4">Operating Systems</h3>
          {Object.keys(os).length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(os).map(([key, value]) => ({ key, value }))} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="key" className="domain-text" label={{ value: "OS", fontSize: 12 }} />
                <YAxis className="domain-text" label={{ value: "Visitors", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-sm">No OS data available</p>
          )}
        </div>
      </div>

      {/* Detailed Stats Tables */}
      <div className="mt-6 space-y-4">
        {/* Top Pages Table */}
        <div>
          <h3 className="text-semibold mb-3">Top Pages</h3>
          <div className="overflow-x-auto">
            <table className="w-full collapse border-border rounded-lg shadow-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Page</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Views</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p: any, index: number) => (
                  <tr key={index} className="border-b border-border hover:bg-accent/20">
                    <td className="p-4">{p.path || "/"}</td>
                    <td className="p-4">{p.pageviews || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Countries Table */}
        <div>
          <h3 className="text-semibold mb-3">Countries</h3>
          <div className="overflow-x-auto">
            <table className="w-full collapse border-border rounded-lg shadow-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Country</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Visitors</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((c: any, index: number) => (
                  <tr key={index} className="border-b border-border hover:bg-accent/20">
                    <td className="p-4">{c.country}</td>
                    <td className="p-4">{c.visitors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Browsers Table */}
        <div>
          <h3 className="text-semibold mb-3">Browsers</h3>
          {Object.entries(browsers).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full collapse border-border rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Browser</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(browsers as Record<string, number>).map(([browser, visitors]: [string, number], index) => (
                    <tr key={index} className="border-b border-border hover:bg-accent/20">
                      <td className="p-4">{browser}</td>
                      <td className="p-4">{visitors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No browser data available</p>
          )}
        </div>

        {/* OS Table */}
        <div>
          <h3 className="text-semibold mb-3">Operating Systems</h3>
          {Object.keys(os).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full collapse border-border rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">OS</th>
                    <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(os as Record<string, number>).map(([osName, visitors]: [string, number], index) => (
                    <tr key={index} className="border-b border-border hover:bg-accent/20">
                      <td className="p-4">{osName}</td>
                      <td className="p-4">{visitors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No OS data available</p>
          )}
        </div>
      </div>

      {/* Sessions Timeline - simple stats */}
      <div className="mt-6 pt-6 border-t text-muted-foreground text-xs">
        <div>Data refreshed every 30s</div>
      </div>
    </div>
  );
}