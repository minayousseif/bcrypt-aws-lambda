# We will be uisng amazon linux to compile bcrypt
FROM amazonlinux:latest

RUN yum install gcc44 gcc-c++ libgcc44 cmake wget tar gzip make -y

# Install node 12.14.x

# Install the node dependencies
RUN yarn install

# Package the lambdas
RUN yarn run package