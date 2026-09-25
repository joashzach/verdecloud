/**
 * services/api.js
 * ---------------
 * Stub API functions for Recommendations & Reports.
 * Currently returns mock data with a simulated network delay.
 * Replace the function bodies with real fetch() calls once the
 * backend endpoints are available.
 *
 * Contracts:
 *   getRecommendations() → Promise<Recommendation[]>
 *   generateReport()     → Promise<Report>
 */

import { recommendations, mockReport } from "../data/mockData";

/** Simulated network latency (ms) */
const FAKE_LATENCY = 900;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all recommendations for the current user's infrastructure.
 * @returns {Promise<import('../data/mockData').Recommendation[]>}
 */
export async function getRecommendations() {
  await delay(FAKE_LATENCY);

  // Uncomment to test the error state:
  // throw new Error("Network error — could not load recommendations");

  return recommendations;
}

/**
 * Trigger report generation.
 * Returns a Report object. The download Blob is built client-side
 * in DownloadLink.jsx since there is no backend yet.
 * @returns {Promise<import('../data/mockData').Report>}
 */
export async function generateReport() {
  await delay(FAKE_LATENCY * 1.5);

  // Uncomment to test the error state:
  // throw new Error("Report generation failed — please try again");

  return {
    ...mockReport,
    generatedAt: new Date().toISOString(), // fresh timestamp on each call
  };
}
