export const loadProfiles = {
  standard: {
    stages: [
      { duration: '5s', target: 20 }, // Ramp up to 20 users
      { duration: '10s', target: 20 }, // Hold for 10s
      { duration: '5s', target: 0 },   // Ramp down
    ],
    thresholds: {
      http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
  },
  stress: {
    stages: [
      { duration: '2s', target: 100 }, // Spike up to 100 users very quickly
      { duration: '5s', target: 100 }, // Hold at 100 users
      { duration: '2s', target: 0 },   // Spike down
    ],
    thresholds: {
      http_req_duration: ['p(95)<1000'],
      http_req_failed: ['rate<0.05'], // Allow up to 5% failures under stress
    },
  },
  soak: {
    stages: [
      { duration: '1m', target: 10 }, // Ramp up to 10 users
      { duration: '3m', target: 10 }, // Hold for 3m (shortened for demo)
      { duration: '1m', target: 0 },  // Ramp down
    ],
    thresholds: {
      http_req_duration: ['p(95)<500'],
    },
  }
};

export function getProfile(profileName: string) {
  return (loadProfiles as any)[profileName] || loadProfiles.standard;
}
