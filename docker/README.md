```sh
docker rm -f nuxt3-demo

docker rmi nuxt3-demo

docker build --platform linux/amd64 \
--file ./docker/Dockerfile \
-t nuxt3-demo .

docker build \
--file ./docker/Dockerfile \
-t nuxt3-demo .

docker run --name nuxt3-demo -p 80:3000 \
--restart unless-stopped \
-d nuxt3-demo:latest
```
