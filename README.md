# bcrypt-aws-lambda
bcrypt as a lambda function


## WIP POC
This is a work in progress proof-of-concept inspired by [auth0/node-baas](https://github.com/auth0/node-baas) and the great online article [Parallelizing and auto-scaling bcrypt](https://auth0.engineering/bcrypt-as-a-service-9e71707bda47) by Damian Schenkelman.


## Goal

The goal here is to use bcrypt as a lambda function instead of running a fleet of EC2 instances in a high availability mode, We will be able to either invoke the bcrypt lambda from another service as a worker in fan-out mode or send a request to an internal ALB invoking the bcrypt lambda as a target. that way we can offload the password/hash computations from the main user registration and authentication service or API and be cost-effective by only paying for what we use.

![bcrypt-as-a-lambda](/readme-assets/bcrypt-as-a-lambda.png)

## Initial Lambda Test

Bcrypt is both memory and CPU-intensive, To run it inside a Lambda function we need to find the optimal memory configuration for our AWS Lamba. The amount of memory we allocate to our function AWS Lambda allocates proportional CPU power. Memory options in Lambda impact on overall function performance, including I/O, network and CPU.

> Lambda allocates compute power in proportion to the memory you allocate to your function. This means you can over provision memory to run your functions faster and potentially reduce your costs.

 
- https://aws.amazon.com/blogs/architecture/best-practices-for-developing-on-aws-lambda/
- https://hackernoon.com/lower-your-aws-lambda-bill-by-increasing-memory-size-yep-e591ae499692
- https://dev.to/byrro/how-to-optimize-lambda-memory-and-cpu-4dj1

![bcrypt-lambda-function](/readme-assets/bcrypt-lambda-function.png)

### Running our Bcrypt Lambda function under different memory options

We ran our Bcrypt Lambda function under different memory allocations using the default salt rounds (10) to conclude that 1536 MB is our optimal memory choice.

| Lambda Memory Size 	| Max Memory 	| Billed Duration 	| Duration 	|
|--------------------	|------------	|-----------------	|----------	|
| 128 MB             	| ~ 95 MB    	| 1000 ms         	| ~950 ms  	|
| 512 MB             	| ~ 95 MB    	| 300 ms          	| ~225 ms  	|
| 1024 MB            	| ~ 95 MB    	| 200 ms          	| ~110 ms  	|
| 1536 MB            	| ~ 95 MB    	| 100 ms          	| ~75 ms   	|
| 2048 MB            	| ~ 95 MB    	| 100 ms          	| ~75 ms   	|
| 3008 MB            	| ~ 95 MB    	| 100 ms          	| ~75 ms   	|



## Lambda Pricing Calculations

Since we did determine that allocating 1536 MB of memory to the Bcrypt Lambda would be the optimal setup, Now it is time to calculate the cost based on that.

- **Number of requests:** 1000000
- **Duration of each request (in ms):** 100 rounded to nearest 100ms.
- **Amount of memory allocated:** 1536 MB

**AWS Lambda costs:** Without Free Tier (monthly): **2.70 USD** Per 1 million Lambda requests.

For more details about AWS Lambda pricing please visit https://aws.amazon.com/lambda/pricing/