"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics", {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        // Disable caching for real-time data
        // cache: "no-store",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Analytics API ${res.status}: ${errText}`);
      }

      const data = await res.json();
      setStats(data);
    } catch (e: any) {
      setError(e.message || "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-lg">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-error">Error: {error}</p>
        <button
          onClick={fetchStats}
          className="btn btn-primary mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <nav className="mb-8">
        <Link
          href="/"
          className="mr-4 text-primary hover-underline"
        >
          ← Back to site
        </Link>
        <Link
          href="/api/admin/settings"
          className="text-primary hover-underline"
        >
          Settings
        </Link>
      </nav>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-2">Pageviews</h3>
          <p className="text-3xl font-bold">
            {stats.pageviews?.toLocaleString() || "0"}
          </p>
        </div>

        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold">
            {stats.unique_visitors?.toLocaleString() || "0"}
          </p>
        </div>

        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-2">Sessions</h3>
          <p className="text-3xl font-bold">
            {stats.sessions?.toLocaleString() || "0"}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bounce Rate */}
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-4">Bounce Rate</h3>
          <p className="text-4xl font-bold {stats.bounce_rate > 0 ? "text-primary" : "text-muted-foreground"}">
            {stats.bounce_rate?.toFixed(1) || "0"}%
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            of total visits
          </p>
        </div>

        {/* Top Pages */}
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-4">Top Pages</h3>
          {stats.top_pages?.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {stats.top_pages.slice(0, 5).map((page: any, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span />
                  <span>{page.path || "—"}</span>
                  <span className="ml-auto text-success">
                    {page.pageviews?.toLocaleString() || "0"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No page data available</p>
          )}
        </div>
      </div>

      {/* Geography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Countries */}
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-4">Top Countries</h3>
          {stats.countries?.length > 0 ? (
            <ul className="space-y-1 text-xs">
              {stats.countries.slice(0, 5).map((country: any, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span />
                  <span>{country.country || "—"}</span>
                  <span className="ml-auto text-success">
                    {country.visitors?.toLocaleString() || "0"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No country data available</p>
          )}
        </div>

        {/* Browsers */}
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-4">Browsers</h3>
          <div className="grid grid-cols-2 gap-2">
            ["Chrome", "Safari", "Firefox", "Edge", "Mobile"].map(
              (browser, i) => {
                const count = stats.browsers?.[browser as keyof typeof stats.browsers] || 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="w-3 h-1 rounded bg-primary/30" />
                    <span className="text-xs">{browser}</span>
                    <span className="text-xs text-muted-foreground">
                      {count.toLocaleString()}
                    </span>
                  </div>
                );
              }
            )
          </div>
        </div>

        {/* OS */}
        <div className="bg-card p-6 rounded border">
          <h3 className="font-medium text-muted-foreground mb-4">Operating Systems</h3>
          <div className="grid grid-cols-2 gap-2">
            ["Windows", "macOS", "Linux", "iOS", "Android"].map(
              (os, i) => {
                const count = stats.os?.[os as keyof typeof stats.os] || 0;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="w-3 h-1 rounded bg-primary/30" />
                    <span className="text-xs">{os}</span>
                    <span className="text-xs text-muted-foreground">
                      {count.toLocaleString()}
                    </span>
                  </div>
                );
              }
            )
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-primary/5 rounded">
        <h3 className="font-semibold mb-4">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Events</div>
            <div className="font-medium">{stats.events || 0}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Date Range</div>
            <div className="font-medium">All time</div>
          </div>
        </div>
      </div>
    </div>
  );
}