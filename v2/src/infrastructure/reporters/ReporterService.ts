
import * as fs from 'fs-extra';
import { join } from 'path';

// Since Allure expects an attachment call from the CustomWorld 'this',
// we will accept the custom world's attach function as a parameter.
export class ReporterService {
  public static async attachArtifacts(
    attach: any,
    scenarioId: string,
    testName: string,
    result: any,
    page: any // Using any to avoid tight coupling to CustomWorld here
  ): Promise<void> {
    if (!result) return;

    attach(`Status: ${result.status}. Duration:${result.duration?.seconds}s`, "text/plain");

    if (page) {
      const image = await page.screenshot({ path: join("artifacts/screenshots", `${scenarioId}.png`) });
      if (image) attach(image, "image/png");

      const videoPath = await page.video()?.path();
      if (videoPath) attach(videoPath, "video/webm");
    }

    // Attach Har if exists
    const harPath = `artifacts/hars/${testName}_${scenarioId}.har`;
    if (fs.existsSync(harPath)) {
      attach(fs.readFileSync(harPath).toString("utf-8"), "application/json");
    }

    // Attach scenario log file
    const logPath = `artifacts/logs/${scenarioId}.log`;
    if (fs.existsSync(logPath)) {
      attach(fs.readFileSync(logPath).toString("utf-8"), "text/plain");
    }
  }
}
