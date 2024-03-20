// Helper functions to account for the fact this applications is deployed on many different domains via Vercel, and on localhost

// Use on the frontend (React components) to get domain
const getDomainFromWindow = (): string | null => {
  // First, check if this function is being called on the frontend. If so, get domain from windown
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return null;
};

export default getDomainFromWindow;
