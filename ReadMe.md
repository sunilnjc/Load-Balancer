the LoadBalancer class in loadBalancer.ts doesn't directly invoke or reference the servers.ts file. This is because the two files serve different purposes and run as separate processes:

servers.ts: This file creates and starts multiple backend server instances. Each server runs on a different port (e.g., 3001, 3002, 3003). These servers handle the actual requests that get proxied by the load balancer.
loadBalancer.ts: This file creates and starts the load balancer, which listens on a single port (e.g., 3000). The load balancer distributes incoming requests to the backend servers in a round-robin fashion.

The relationship between the two is based on network communication rather than direct code invocation.

Here's a more detailed explanation:

How the Load Balancer and Servers Work Together
Start Backend Servers:
You run servers.ts to start multiple backend server instances. These servers will be listening on different ports (3001, 3002, 3003).
Start Load Balancer:
You run loadBalancer.ts to start the load balancer. The load balancer listens on a specified port (e.g., 3000) and uses the http-proxy library to forward incoming requests to one of the backend servers.

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
