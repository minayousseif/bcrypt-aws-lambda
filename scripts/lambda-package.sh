#!/bin/bash
set -e

IMAGE_TAG="bcrypt-lambda-build"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WORK_DIR="$(cd $SCRIPT_DIR && cd .. && pwd)"

echo $SCRIPT_DIR
echo $WORK_DIR

echo "packaging the bcrypt lambda inside an amazonlinux 2 docker container"
# do a quick cleanup first
rm -rf pkg
# building the image
docker build -f $WORK_DIR/Dockerfile.lambda.dockerfile -t $IMAGE_TAG .
# create and copy 
docker create --name $IMAGE_TAG $IMAGE_TAG
docker cp $IMAGE_TAG:lambda-build/pkg ./pkg
docker rm -f -v $IMAGE_TAG