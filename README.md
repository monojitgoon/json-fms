# JSON File Management System - A PEVN(Postgres, Express, Vue and Node.js) App

The Application allows user to upload pre-defined json file along with parsing to save object information.

## Project setup

Local Setup guidelines are available in the respective directories.

### Run Application with Docker

1. Install docker (https://www.docker.com/)

2. Run ```docker-compose build```. This will create images for our client, server and db.

3. Run ```docker-compose up```. This will host images inside a docker container. After this step the client instance should be available on http://localhost:8080/ and the server instance should be available on http://localhost:4000/.



# Docker Tips
Docker can take up some space quickly, and when errors happen, you sometimes get stuck with intermediate containers not being destroyed. Here are a couple of commands to help you see whats going on and clean up your machine.

### Inspecting
- **View running containers** - `docker ps` or `docker-compose ps`
- **View all containers** - `docker ps -a`
- **View all images** - `docker images`
- **View all volumes** - `docker volume ls`

### Cleanup
- **Remove a container** - `docker rm <CONTAINER_ID>`
- **Remove a image** - `docker rmi <IMAGE_ID>`
- **Remove a volume** - `docker volume rm <VOLUME>`
- **Remove all containers** - `docker rm $(docker ps -aq)`
- **Remove all hanging images** - `docker rmi $(docker images -q -f "dangling=true")`
- **Remove all hanging volumes** - `docker volume rm $(docker volume ls -qf "dangling=true")`