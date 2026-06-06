import { createLogger, format, transports, Logger } from "winston";
import * as fs from "fs-extra";
import { join } from "path";

export class LoggerService {
  private static loggers = new Map<string, Logger>();
  private static readonly LOG_DIR = "artifacts/logs";

  public static initialize(): void {
    fs.ensureDirSync(this.LOG_DIR);
  }

  public static getLogger(scenarioId: string): Logger {
    if (this.loggers.has(scenarioId)) {
      return this.loggers.get(scenarioId)!;
    }

    const logPath = join(this.LOG_DIR, `${scenarioId}.log`);
    
    const logger = createLogger({
      level: process.env.PWDEBUG ? "debug" : "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
      ),
      transports: [
        new transports.File({ filename: logPath }),
        new transports.Console()
      ]
    });

    this.loggers.set(scenarioId, logger);
    return logger;
  }

  public static getLogPath(scenarioId: string): string {
    return join(this.LOG_DIR, `${scenarioId}.log`);
  }

  public static closeLogger(scenarioId: string): void {
    const logger = this.loggers.get(scenarioId);
    if (logger) {
      logger.close();
      this.loggers.delete(scenarioId);
    }
  }
}
