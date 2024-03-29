# label

[zimekk.github.io/label](https://zimekk.github.io/label)

## related

- https://github.com/tensorflow/tfjs-examples/tree/master/mnist-core
- https://github.com/bensonruan/Hand-Written-Digit-Recognition
- https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection
- https://github.com/cloud-annotations/cloud-annotations
- https://github.com/tensorflow/tfjs-examples/tree/master/simple-object-detection

## settings

```sh
ssh-keygen -t rsa -b 4096 -C "" -f /tmp/ACTIONS_DEPLOY_KEY -N ""
pbcopy < /tmp/ACTIONS_DEPLOY_KEY.pub # Deploy keys - Add deploy key
pbcopy < /tmp/ACTIONS_DEPLOY_KEY # Secrets - New repository secret
```

## install

```sh
nvm install v14
npm i -g yarn
```

```sh
node -v # v14.18.2
yarn -v # 1.22.19
```

## run

```sh
yarn
yarn start # ⚡️[server]: Server is running at http://localhost:8080
```

```sh
curl http://localhost:8080 # <!DOCTYPE html>
```

## docker

```sh
docker-compose config # services:
docker-compose up --build # app_1  | ⚡️[server]: Server is running at http://localhost:8080
```

```sh
curl http://localhost:8080 # <!DOCTYPE html>
```

## hooks

```sh
yarn husky install
yarn husky add .husky/pre-commit "yarn pretty-quick --staged"
yarn husky add .husky/commit-msg "yarn commitlint --edit \$1"
```
