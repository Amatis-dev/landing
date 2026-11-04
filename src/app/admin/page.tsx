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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold">{stats.pageviews}</div>
          <div className="text-sm text-muted-foreground">Pageviews</div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold">{stats.unique_visitors}</div>
          <div className="text-sm text-muted-foreground">Unique Visitors</div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold">{stats.sessions}</div>
          <div className="text-sm text-muted-foreground">Sessions</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-xs text-muted-foreground uppercase">Top Pages</div>
          <ul className="space-y-1 text-sm">{stats.top_pages.map((p: any, idx: number) => (
            <li key={idx} className="flex justify-between">
              <span className="flex-1 truncate">{p.path || "/"}</span>
              <span>{p.pageviews || 0}</span>
            </li>
          ))}</ul>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-xs text-muted-foreground uppercase">Bounce Rate</div>
          <div className="text-3xl font-bold">{Math.round(stats.bounce_rate)}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-xs text-muted-foreground uppercase">Countries</div>
          <ul className="space-y-1 text-sm">{stats.countries.map((c: any) => (
            <li key={c.country}>
              <span>{c.country}</span>
              <span>{c.visitors}</span>
            </li>
          ))}</ul>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-xs text-muted-foreground uppercase">Browsers</div>
          <ul className="space-y-1 text-sm">{Object.entries(stats.browsers as Record<string, number>).map(([b, v]) => (
            <li key={b}>
              <span>{b}</span>
              <span>{v}</span>
            </li>
          ))}</ul>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-sm">
          <div className="text-xs text-muted-foreground uppercase">OS</div>
          <ul className="space-y-1 text-sm">{Object.entries(stats.os as Record<string, number>).map(([o, v]) => (
            <li key={o}>
              <span>{o}</span>
              <span>{v}</span>
            </li>
          ))}</ul>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t text-muted-foreground text-xs">
        <div>Session Events: {stats.events || 0}</div>
        <div>Data refreshed every 30s</div>
      </div>
    </div>
  );
}