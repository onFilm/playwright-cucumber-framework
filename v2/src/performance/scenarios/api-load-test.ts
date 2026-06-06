/* eslint-disable */
import http from "k6/http";
import { check, sleep } from "k6";
import { getProfile } from "../config/load-profiles";
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// __ENV.PROFILE passed from CLI, default to standard
const profileName = __ENV.PROFILE || "standard";
export const options = getProfile(profileName);

export default function () {
  // 1. GET User
  const getRes = http.get("https://jsonplaceholder.typicode.com/users/2");
  check(getRes, {
    "GET user status is 200": (r) => r.status === 200,
    "GET user has correct name": (r) => {
      try {
        const body = JSON.parse(r.body as string);
        return body.name === "Ervin Howell";
      } catch { return false; }
    }
  });

  // 2. POST New User
  const payload = JSON.stringify({
    name: "Morpheus",
    job: "Leader"
  });
  const postRes = http.post("https://jsonplaceholder.typicode.com/users", payload, {
    headers: { "Content-Type": "application/json" }
  });
  check(postRes, {
    "POST user status is 201": (r) => r.status === 201
  });

  sleep(1);
}

export function handleSummary(data: any) {
  return {
    "artifacts/k6-api-report.html": htmlReport(data)
  };
}
