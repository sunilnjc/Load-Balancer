import express, { Request, Response } from "express";
import httpProxy from "http-proxy";
import { server } from "typescript";

class IpHash {
  private servers: string[];
  private currentServerIndex: number;
  private proxy: httpProxy;

  constructor(servers: string[]) {
    this.servers = servers;
    this.currentServerIndex = 0;
    this.proxy = httpProxy.createProxyServer({});
  }

  /*
   * Implementing the ip hash logic in here
   * @param ip
   * @returns the server based on the hash of the ip
   */
  private ipHash(ip: string): string {
    const hash = require("crypto").createHash("md5").update(ip).digest("hex");
    const index = parseInt(hash.substring(0, 8), 16) % this.servers.length;
    return this.servers[index];
  }

  /**
   * Proxying requests to the next target server
   * @param port
   */
  public start(port: number, algo: string) {
    const app = express();

    app.all("*", (req: Request, res: Response) => {
      const clientIp = req.ip || "";
      const target = this.ipHash(clientIp);
      console.log("clientIp :: ", clientIp);
      console.log(`iPhash Proxying request to : ${target}`);

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

const loadBalancer = new IpHash(servers);
loadBalancer.start(3000, "iphash");
