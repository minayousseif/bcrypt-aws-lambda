# bcrypt-aws-lambda
bcrypt as a lambda function


## WIP POC
This is a work in progress proof-of-concept inspired by [auth0/node-baas](https://github.com/auth0/node-baas) and the great online article [Parallelizing and auto-scaling bcrypt](https://auth0.engineering/bcrypt-as-a-service-9e71707bda47) by Damian Schenkelman.


## Goal

The goal here is to use bcrypt as a lambda function instead of running a fleet of EC2 instances in a high availability mode, We will be able to either invoke the bcrypt lambda from another service as a worker in fan-out mode or send a request to an internal ALB invoking the bcrypt lambda as a target. that way we can offload the password/hash computations from the main user registration and authentication service or API and be cost-effective by only paying for what we use.