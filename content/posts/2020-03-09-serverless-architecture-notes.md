---
template: post
title: Serverless Architecture Notes
slug: serverless-architecture-notes
draft: true
date: '2020-01-10T12:00:00.000Z'
description: >
  Playing with Serverless architecture
category: Back-end
tags:
  - DevOps
  - AWS
  - Serverless
---

## Udemy: Ultimate AWS certified developer associate 2020

/- Stephane Maarek

Take notes.
Practice, do practicle implementations.

### AWS Serverless: Lambda

- Developers don't have to manage servers anymore.
- Just deploy code as functions.
- AKA FaaS (Function as a Service).
- Pay per request and compute time.
- Easy monitoring through AWS CloudWatch.

Examples-

1. Thumbnail generator.
2. CRON Job using CloudWatch events.

Create a test event.
config parameters
Timeout: default 3 seconds.
Environment variables
Allocated memory
Ability to deploy within a VPC + assign security groups.
IAM execution role must be attached to the lambda function.
Give permissions to lambda function to make writes into the DynamoDB.

#### Versioning of Lambda functions.

Each version is immutable.
Version = code + configuration
Using aliases like dev, stage, test to point to different versions.
Shifting traffic to diferent versions.

#### External Dependencies

We need to install the packages alongside our code and zip it together.

```sh
npm i abc
chmod a+r \*
zip -r function.zip .
```

### AWS Serverless: DynamoDB

- NoSQL Serverless Database.
- NoSQL databases scale horizontally.
- DynamoDB is made of tables.
- Each table has a primary key.
- Table must have provisioned read and write capacity units.
- One write capacity unit represents one write per second for an item up to 1KB in size.
- If the items are larger than 1 KB, more WCU are consumed.
- Strongly Consistent Read vs Eventually Consistend Read.
- One read capacity unit represents one strongly consistent read per second, or two eventually consistent reads per second, for an item up to 4KB in size.
- DynamoDB charges for reading, writing, and storing data in your tables.
- Option to choose on-demand or provisioned capacity modes.

#### Free Tier

- 25 GB of data storage.
- 2.5 million stream read requests from DynamoDB Streams.
- 1 GB of data transfer out, aggregated across AWS services.

### AWS Serverless: API Gateway

- Handles API versioning.
- Handles different environments.
- Handles security (Authentication and Authorization).
- Transform and validate requests and responses.
- Cache API responses.
- Stage Variables are useful. They can also be used in lambda functions with the context object.

#### Pricing

- Pay only for the API calls you receive and the amount of data transferred out.
- API Gateway also provides optional data caching charged at an hourly rate that varies based on the cache size you select.

#### Free Tier

- 1 million HTTP API calls, 1 million REST API calls, one million messages, and 750k connection minutes per month for up to 12 months.

#### Mapping templates

## Udemy: AWS Certified Developer - Associate 2020

/- Ryan Kroonenburg, A Cloud Guru

### Serverless

#### Lambda

- Lambda scales out (not up) automatically.
- Lambda functions are independent, 1 event = 1 function
- Lambda functions can trigger other lambda functions.
- AWS X-ray allows you to debug what is happening.
- Structure of request and response depending upon if API Gateway uses Lambda proxy integration.

#### API Gateway

- Track and control usage by API key.
- Throttle requests to prevent attacks. (DDOS attack).
- Connect to CloudWatch to log all requests for monitoring.
- Maintain multiple versions of your API.
- Caching to reduce the number of calls made to your endpoint and also improve the latency of the requests to your API.
- Import option to import an API from an external definition file into API Gateway.
- There is also an option to make an API request with API definition in the payload. API's will be updated from the definitions received in the payload.
- Transformation of request and responses.
- Gateway responses are triggered when the request does not reaches the backend resource.
- Models define the data structure of payload.
- Choose Regional endpoints if that API is primarily accessed from within the same AWS Region.
- Edge optimized are best for public services being accessed from any region over the internet.

## Pluralsight: Serverless Application Model

### Benefits

1. Pay-per-execution pricing.
2. Scalability

### Possible use cases

- Processing payments
- Building Backend API
- Send transactional emails/SMS

### gereric signature of all AWS Lambda functions:

```js
exports.handler = (event, context, callback) => {
  // "event" has information about the path, body, headers, etc. of the request
  console.log('event', event);
  // "context" has information about the lambda environment and user details
  console.log('context', context);
  // The "callback" ends the execution of the function and returns a response back to the caller
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: '⊂◉‿◉ つ'
    })
  });
};
```

#### netlify-lambda

Netlify-lambda is a tool for locally emulating the serverless function for development and for bundling our serverless function with third party npm modules.

### AWS CloudFormation

Infrastructure as a code.
CloudFormation Template.

### Serverless Resources

- AWS LAmbda Functions
- AWS API Gateway APIs
- AWS DynamoDB Tables

### Serverless Application Model

- Simplifies Resource provisioning and configuration.
- Check out sam-cli for details.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Resources:
  MyLambdaFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Runtime: nodejs8.10
      Handler: index.handler
      CodeUri:
        Bucket: artifacts-for-lambda
        Key: my-lambda-package.zip
      Events:
        MySchedule:
          Type: Schedule
          Properties:
            Schedule: rate(1 minute)
        MyS3Upload:
          Type: S3
          Properties:
            Bucket: upload-something-here
            Events: s3:ObjectCreated:*
        MyApiResource:
          Type: Api
          Properties:
            Path: /my-resource
            Method: get
  MyS3Bucket:
    Type: 'AWS::S3:Bucket'
    Properties:
    BucketName: upload-something-here
```

IAM also needed to allow Lambda functions to read and write into DB.
Access to API Gateway to invoke Lambda functions.

#### Triggering Lambda Function

Events Property

- CloudWatch Schedule
- S3 Upload
- API Gateway HTTP Request

```
aws cloudformation package
aws cloudformation deploy
```

### AWS Lambda

Lambda proxy integration or Lambda non-proxy integration

Choosing a region for Lambda function.
API Gateway configures the integration request and integration response for you.

Proxy integration-
Entire client request is sent to the backend Lambda function as is, except that the order of the request parameters isn't preserved. API Gateway maps the entire client request to the input event parameter of the backend Lambda function. The Lambda function's output, including status code, headers, and body, is returned to the client as is. This is preferred integration type.
With proxy integration you can change the Lambda function implementation at any time without needing to redeploy your API.

Non-proxy integration-
Aka custom integration. Here you configure the way the parameters, headers, and body of the client's request are translated into the format that your backend Lambda function requires. And you configure the way the Lambda function output is translated back to the format that's required by the client.

## Pluralsight - Fernando Medina Corey

Event driven functions.
Code focused.
Runs on managed machines which we need not care about.

### Benefits

1. Cost and utilization.
2. No need to deal with machines and security.
3. Integrations with other services.
4. Scaling is handled for us.

### Challenges

1. Debugging is difficult.
2. We do not get lower level control over the OS.

AWS Lambda has built in versioning for our functions.

Some niche providers
iron.io, cloudflare workers, openFaaS

Free Tier Examples-
EC2 - 750 hours
1 Million lambda function invokations.
Dynamo - 25GB
RDS- 20GB
S3 - 5GB

While starting fresh on AWS. First thing to check is your region.
Creating user groups like data scientists, developers, managers and then enabling disabling services as per the user group.
IAM Policy

AWS policy generator to create a custom policy.
So create custom policies and assign it to the roles.

### Lambda

- Languages and runtimes
- Size and resource limitations
- Gathering dependencies
- Writing code locally
- Function packages.
- Debugging

Uncompressed code & dependencies < 250 MB
Compressed function package < 50 MB
Total function packages in a region < 75 GB
Maximum execution duration < 900 seconds
Concurrent Lambda functions < 1000

Creating a function package.
Test your functions with sample events.

Debugging-
Use logging and CloudWatch.

Take care of Environment differences.

## Self: Creating an Email subscription list

1. Create a new DynamoDB table.
2. Create a IAM role and provide basic lambda function execution permissions.
3. Create a lambda function with the role from last step.
4. Create API gateway and set it to trigger the lambda function from last step.

## Self: Writing Lambda functions

The body field of the event in a proxy integration is a raw string.
In order to extract meaningful values, we need to first parse this string
into an object. A more robust implementation might inspect the Content-Type
header first and use a different parsing strategy based on that value.

### Lambda vs Lambda-Proxy integrations

- In Lambda-Proxy integration the Lambda function receives the whole requests as such and responsibility of setting the response message and status code is also on the Lambda function.
- In Lambda integration the request transformation is done in API Gateway. Response Transformation and statusCode setting is also done in API Gateway.
- Use Lambda-Proxy for simple integration and handling everything in our lambda functions.
- Use Lambda Integration for more control on workflow, generate sophisticated documentation and SDK.

#### Lambda Proxy Integration

- The event parameter has the whole request object sent from the client.
- First argument to the callback is for sending error to client.
- Second argument to the callback is for sending the response.
- Expected attributes in response are statusCode, headers and body.

#### Lambda Integration Setup

- Too many configurations in the API Gateway.
- Integration Request in the request-response workflow screen is where we can do transformations with the API Gateway.
- Integration Request is where we transform request using the mapping template defined as per content-type.
- Integration Response is where we can assign appropriate status code and do response transformation.
- Mapping template is a script expressed in Velocity Template Language (VTL).
- Transformation such as adding custom headers, query parameters and body templates.
- Success response is similar to Lambda-Proxy but no need to specify the status code and the headers.
- Status codes are assigned based on the Regex pattern we define in the Integration Response.
- 200 status code is default mapping hence even error responses will get sent with 200 status code.

#### General Description

```
╔════════════════════════════════════════════════╦═══════════════════════════════════════════════════════╗
║                  Lambda-Proxy                  ║                         Lambda                        ║
╠════════════════════════════════════════════════╬═══════════════════════════════════════════════════════╣
║ 1. Prone to human errors, as status code       ║ 1. Involves lot of work in setting up the integration ║
║     and response message will be in code.      ║     request template, response template, status code  ║
║     This is subjective, but a point to stay in ║     pattern. All these need some extra knowledge on   ║
║     the dis-advantage.                         ║     VTL(Velocity Template Language) and JSON Path.    ║
║                                                ║                                                       ║
║ 2. Everything rests in the code. Headers,      ║                                                       ║
║     status codes, messages are hidden in the   ║                                                       ║
║     source code. Making it difficult to        ║                                                       ║
║     generate documentation.                    ║                                                       ║
╚════════════════════════════════════════════════╩═══════════════════════════════════════════════════════╝
```

#### Request and Response

```
╔════════════════════════════════════════════════╦════════════════════════════════════════════════╗
║                  Lambda-Proxy                  ║                     Lambda                     ║
╠════════════════════════════════════════════════╬════════════════════════════════════════════════╣
║ - Request from the client are sent directly to ║ - Request and Response can be altered/modified ║
║   lambda. In the same way, responses are       ║   when it is sent to and from the lambda.      ║
║   sent directly from the lambda. API Gateway   ║   API Gateway has full control of the request  ║
║   has no part in the transmission data.        ║   and responses.                               ║
║                                                ║                                                ║
║ - Status code of the response message such     ║ - Status Code of the response message are set  ║
║   as 2XX, 4XX & 5XX are set by the lambda.     ║   by the API Gateway.                          ║
╚════════════════════════════════════════════════╩════════════════════════════════════════════════╝
```

#### Advantages

```
╔══════════════════════════════════════════════════════╦═════════════════════════════════════════════════════════════════════════╗
║                     Lambda-Proxy                     ║                                  Lambda                                 ║
╠══════════════════════════════════════════════════════╬═════════════════════════════════════════════════════════════════════════╣
║ 1. Very Easy to setup. Status code and the response  ║ 1. It completely decouples the APIGateway from Lambda's request         ║
║      message are in lambda's control.                ║     and response payload, its headers and statusCodes. Thus, you        ║
║                                                      ║     have more control over the workflow.                                ║
║                                                      ║                                                                         ║
║ 2. Easy for rapid prototyping, as you don't want     ║ 2. Provides a procedural way of defining various status codes and error ║
║     to setup any APIGateway's settings.              ║     messages.                                                           ║
║                                                      ║                                                                         ║
║                                                      ║ 3. The settings can be easily exported as Swagger specification, which  ║
║                                                      ║     makes documentation and generation of SDK much easier.              ║
╚══════════════════════════════════════════════════════╩═════════════════════════════════════════════════════════════════════════╝
```

#### Dis-Advantages

```
╔════════════════════════════════════════════════╦═══════════════════════════════════════════════════════╗
║                  Lambda-Proxy                  ║                         Lambda                        ║
╠════════════════════════════════════════════════╬═══════════════════════════════════════════════════════╣
║ 1. Prone to human errors, as status code       ║ 1. Involves lot of work in setting up the integration ║
║     and response message will be in code.      ║     request template, response template, status code  ║
║     This is subjective, but a point to stay in ║     pattern. All these need some extra knowledge on   ║
║     the dis-advantage.                         ║     VTL(Velocity Template Language) and JSON Path.    ║
║                                                ║                                                       ║
║ 2. Everything rests in the code. Headers,      ║                                                       ║
║     status codes, messages are hidden in the   ║                                                       ║
║     source code. Making it difficult to        ║                                                       ║
║     generate documentation.                    ║                                                       ║
╚════════════════════════════════════════════════╩═══════════════════════════════════════════════════════╝
```
