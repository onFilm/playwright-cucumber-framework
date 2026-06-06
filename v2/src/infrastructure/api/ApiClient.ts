import { APIRequestContext, request } from 'playwright-core';
import { ConfigManager } from '../config/ConfigManager';
import { LoggerService } from '../logger/LoggerService';
import { singleton } from 'tsyringe';

@singleton()
export class ApiClient {
  private apiContexts = new Map<string, APIRequestContext>();

  public async getContext(scenarioId: string): Promise<APIRequestContext> {
    if (this.apiContexts.has(scenarioId)) {
      return this.apiContexts.get(scenarioId)!;
    }

    const { BASEURL, APIURL } = ConfigManager.config;
    const baseURL = APIURL || BASEURL;

    const context = await request.newContext({
      baseURL,
      ignoreHTTPSErrors: true, // For testing environments
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });

    this.apiContexts.set(scenarioId, context);
    return context;
  }

  public async get(scenarioId: string, endpoint: string, options?: any) {
    const logger = LoggerService.getLogger(scenarioId);
    const context = await this.getContext(scenarioId);
    
    logger.info(`API GET Request: ${endpoint}`);
    const response = await context.get(endpoint, options);
    logger.info(`API GET Response: ${response.status()}`);
    
    return response;
  }

  public async post(scenarioId: string, endpoint: string, options?: any) {
    const logger = LoggerService.getLogger(scenarioId);
    const context = await this.getContext(scenarioId);
    
    logger.info(`API POST Request: ${endpoint}`);
    const response = await context.post(endpoint, options);
    logger.info(`API POST Response: ${response.status()}`);
    
    return response;
  }

  public async put(scenarioId: string, endpoint: string, options?: any) {
    const logger = LoggerService.getLogger(scenarioId);
    const context = await this.getContext(scenarioId);
    
    logger.info(`API PUT Request: ${endpoint}`);
    const response = await context.put(endpoint, options);
    logger.info(`API PUT Response: ${response.status()}`);
    
    return response;
  }

  public async delete(scenarioId: string, endpoint: string, options?: any) {
    const logger = LoggerService.getLogger(scenarioId);
    const context = await this.getContext(scenarioId);
    
    logger.info(`API DELETE Request: ${endpoint}`);
    const response = await context.delete(endpoint, options);
    logger.info(`API DELETE Response: ${response.status()}`);
    
    return response;
  }

  public async disposeContext(scenarioId: string): Promise<void> {
    const context = this.apiContexts.get(scenarioId);
    if (context) {
      await context.dispose();
      this.apiContexts.delete(scenarioId);
    }
  }
}
