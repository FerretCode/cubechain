
# cubechain 📦

A digital currency regulated by a Docker container and accessable via a REST API


## Features 📜

- Scaleable with Docker
- Automated load balancing
- Easy to access for developers
- Optional privacy with API aauthentication
- Optional Firebase integration

## Usage 💻

An ideal configuration of a cubechain would be to have multiple Docker containers linked via container orchestration using Kubernetes or Nomad. The cubechain Docker containers can run in either server or client mode, where servers will automatically manage clients, replicate data between each other, count running operations in each client and act as a proxy to low-traffic client containers.

To set up a currency, you can provide a server container with a currency configuration file which it will replicate across clients. If you were to check the server container logs, you should see messages stating that the network has been set up.

cubechain containers can also run standalone if you don't want to bother with container orchestration or extra setup. Just set up a server container normally, pass the config and designate it as a standalone container and everything will function normally.
