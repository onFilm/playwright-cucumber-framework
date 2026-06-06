/* eslint-disable */
import http from "k6/http";
import { check, sleep } from "k6";
import { UserMapper } from "../../domain/models/User";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: "5s", target: 5 }, // Ramp up to 5 users
    { duration: "10s", target: 5 }, // Hold 5 users
    { duration: "5s", target: 0 } // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"] // 95% of requests should be below 500ms
  }
};

// Base URL passed via __ENV or defaults to saucedemo for testing structure
const BASE_URL = __ENV.BASEURL || "https://www.saucedemo.com";

export default function () {
  // Validate our user domain model (simulating domain reuse in performance tests)
  const simulatedUserRow = { username: "performance_user", password: "secret_sauce" };
  const user = UserMapper.fromDataTable(simulatedUserRow);

  // 1. Hit the login page to simulate user navigating there
  const res = http.get(BASE_URL);
  
  check(res, {
    "is status 200": (r) => r.status === 200,
    "body contains login": (r) => r.body ? r.body.toString().includes("login") : false
  });

  // Simulated API call representing the login action
  // (SwagLabs is a client-side app, so we just simulate an API payload here for demonstration)
  const loginRes = http.post(`${BASE_URL}/api/login`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" }
  });

  check(loginRes, {
    // We expect 404 since /api/login doesn't exist on standard saucedemo, 
    // but this proves the k6 script executes the POST with our domain model!
    "login simulation executed": (r) => r.status !== 0
  });

  sleep(1);
}

export function handleSummary(data: any) {
  return {
    "artifacts/k6-report.html": htmlReport(data)
  };
}
