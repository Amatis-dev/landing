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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Analytics Overview</h2>

      {/* KPIs Table */}
      <div className="overflow-x-auto">
        <table className="w-full collapse border-border rounded-lg shadow-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Metric</th>
              <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Pageviews</td>
              <td className="p-4">{stats.pageviews}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Unique Visitors</td>
              <td className="p-4">{stats.unique_visitors}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Sessions</td>
              <td className="p-4">{stats.sessions}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Bounce Rate</td>
              <td className="p-4">{Math.round(stats.bounce_rate)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed Stats Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full collapse border-border rounded-lg shadow-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Category</th>
              <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Top Pages</td>
              <td className="p-4">{stats.top_pages.map((p: any) => (
                <div className="text-sm">{p.path || "/"}: {p.pageviews || 0} views</div>
              )).join(' ')}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Countries</td>
              <td className="p-4">{stats.countries.map((c: any) => 
                <div className="text-sm">{c.country}: {c.visitors}</div>
              ).join(' ')}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Browsers</td>
              <td className="p-4">{Object.entries(stats.browsers as Record<string, number>).map(([b, v]) => 
                <div className="text-sm">{b}: {v}</div>
              ).join(' ')}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">OS</td>
              <td className="p-4">{Object.entries(stats.os as Record<string, number>).map(([o, v]) => 
                <div className="text-sm">{o}: {v}</div>
              ).join(' ')}</td>
            </tr>
            <tr className="border-b border-border hover:bg-accent/20">
              <td className="p-4">Session Events</td>
              <td className="p-4">{stats.events || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-6 border-t text-muted-foreground text-xs">
        <div>Data refreshed every 30s</div>
      </div>
    </div>
  );
}