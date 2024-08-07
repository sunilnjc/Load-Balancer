import express, { Request, Response } from "express";

const createServer = (port: number): void => {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.send(`Response from server on port ${port}`);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port} `);
  });
};

[3001, 3002, 3003, 3004].forEach((port) => createServer(port));
