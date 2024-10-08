import express, { Request, Response } from "express";
import httpProxy from "http-proxy";

class RoundRobin {
  private servers: string[];
  private currentServerIndex: number;
  private proxy: httpProxy;

  constructor(servers: string[]) {
    this.servers = servers;
    this.currentServerIndex = 0;
    this.proxy = httpProxy.createProxyServer({});
  }

  /**
   * Implementing the round robin logic in here
   * @returns the next server in the list
   */
  private getNextServer(): string {
    const server = this.servers[this.currentServerIndex];
    this.currentServerIndex =
      (this.currentServerIndex + 1) % this.servers.length;

    return server;
  }

  /**
   * Proxying requests to the next target server
   * @param port
   */
  public start(port: number) {
    const app = express();

    app.all("*", (req: Request, res: Response) => {
      const target = this.getNextServer();
      console.log(`Round Robin Proxying request to : ${target}`);

      console.log(`Proxying request to : ${target}`);
      this.proxy.web(req, res, { target });
    });

    app.listen(port, () => {
      console.log(`Load balancer running on port ${port}`);
    });
  }
}

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
];

const loadBalancer = new RoundRobin(servers);
loadBalancer.start(3000);
