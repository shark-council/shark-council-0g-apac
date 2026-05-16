const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://shark-council-0g-apac-app.vercel.app"
    : "http://localhost:3000";

export const appConfig = {
  name: "Shark Council",
  edition: "0G APAC",
  description:
    "Let 0G Sharks, built by elite 0G Developers, debate and execute your trade ideas",
  baseUrl,
  gitHubUrl: "https://github.com/shark-council/shark-council-0g-apac",
  developer: {
    name: "@kiv1n",
    url: "https://x.com/kiv1n",
  },
} as const;
