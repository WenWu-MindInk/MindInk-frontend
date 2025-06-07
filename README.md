# Mind Ink Frontend

This repo is the frontend of our project, Mind Ink. To launch this frontend, you need to follow the instructions below.

## Launching
### 1. Install the nvm
``nvm`` is a version manager for Node.js, which allows you to quickly install and use different versions of node via the command line. You can install ``nvm`` through the instructions from the [official github repo](https://github.com/nvm-sh/nvm).
### 2. Install the node
It is totally fine to install the latest release of node following the instruction below:
```shell
nvm install node
```
### 3. Install the cnpm
``npm`` is a package manager for Node.js. It is installed along with node, so we don't need to install it explicitly. However, it may cause a hug latency when using it. Therefore, we recommand you to install and use ``cnpm`` instead which is faster than ``npm``. You can install the ``cnpm`` following the instruction below.
```shell
npm install cnpm -g --registry=https://registry.npmmirror.com
```
### 4. Install the webpack
```shell
cnpm install webpack -g 
```
### 5. Install vue-cli
```shell
cnpm install -g vue-cli
```
### 6. Install the dependencies
You need to execute the instruction under the root of this project.
```shell
cnpm install
```
You can check the root directory and find the ``node_modules`` dir if success.
### 7. Install router module
```shell
cnpm install vue-router vue-resource --save
```
### 8. Run
```shell
cnpm run dev
```
After running the instruction above, you can check the url path in your browser and there should be a login page which means that you've launched the frontend successfully :)
