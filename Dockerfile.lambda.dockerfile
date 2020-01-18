# We will be uisng amazon linux
FROM amazonlinux:latest

#RUN yum install gcc44 gcc-c++ libgcc44 cmake wget tar gzip make -y
RUN yum install gcc-c++ make zip -y

# Install node 12.x and yarn
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo

RUN yum install nodejs yarn -y \
    && yum clean all

RUN node -v && yarn --version

WORKDIR /lambda-build
COPY . /lambda-build

# Install the node dependencies
RUN yarn install

# Package and zip the lambda
RUN mkdir -p dist \
  && cp ./examples/lambdaHandler.example.js ./dist/index.js \
  && mv ./node_modules ./dist/node_modules \
  && mv ./json-schema ./dist/json-schema \
  && mv ./src ./dist/src

RUN mkdir -p pkg \
  && cd ./dist \
  && zip -r ../pkg/bcrypt-lambda-handler.zip .