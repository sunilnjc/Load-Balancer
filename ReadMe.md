## Load Balancer Algorithms

#### Definition

Load balancing algorithms works on the principle of distributing the incoming network or application traffic across multiple servers to ensure no single server becomes overwhelmed.

A load balancer acts as an intermediary between clients and servers, using various algorithms to decide how to distribute the traffic.

#### Purpose
Load balancing ensures high availability, responsiveness and performance by distributing the load across multiple servers.

### Different Load balancing algorithms

#### RoundRobin

The principle of RoundRobin algorithm is to distribute the load sequentially across the list of available servers in a cyclic order.

#### Pros
Equal distribution of the load across the servers

#### Cons
This algorithm doesn't concerns about the current load on the servers

#### Implementation


servers.ts: This file creates and starts multiple backend server instances. Each server runs on a different port (e.g., 3001, 3002, 3003). These servers handle the actual requests that get proxied by the load balancer.
loadBalancer.ts: This file creates and starts the load balancer, which listens on a single port (e.g., 3000). The load balancer distributes incoming requests to the backend servers in a round-robin fashion.

Start Backend Servers:
Run servers.ts to start multiple backend server instances. These servers will be listening on different ports (3001, 3002, 3003).
Start Load Balancer:
Run loadBalancer.ts to start the load balancer. The load balancer listens on a specified port (e.g., 3000) and uses the http-proxy library to forward incoming requests to one of the backend servers.

Example Workflow

Start Servers:
Run servers.ts using the command:

npm run start:servers

This starts backend servers on ports 3001, 3002, and 3003.

Start Load Balancer:

Run loadBalancer.ts using the command:

npm run start:loadbalancer

This starts the load balancer on port 3000.

Send Requests:
When you send a request to http://localhost:3000, the load balancer receives the request and forwards it to one of the backend servers (e.g., http://localhost:3001, http://localhost:3002, or http://localhost:3003) in a round-robin manner.
