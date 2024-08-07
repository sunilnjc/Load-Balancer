#!/bin/bash

URL="http://localhost:3000"  # Replace with your load balancer URL

while true
do
  echo "$(date): Sending request to $URL"
  curl -w "\nTime: %{time_total}s\n" $URL  # Add response time
  echo ""  # Add a new line for better readability of the output
  sleep 1  # Optional: add a sleep interval (in seconds) between requests
done
