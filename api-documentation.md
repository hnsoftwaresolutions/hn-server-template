# HN Server Template API Documentation

This documentation covers how to use API endpoints and explains how the server works on basic level.

## General

HN Server Template API Server (server in short) is a NodeJS project. Powered by ExpressJS framework and many more!

## Where to send requests?

On the development environment, server listens HTTP requests on:

```
http://localhost:3206/
```

## Default Responses

These responses are common for all requests.

| When | Status Code | Body | Example |
| :-: | :-: | :-: | :-: |
| If end point does not exists | 404 |  | There is no route like ```/hi/i-am-not-exist``` and you sent a request to that route. |
| If rate limit exceeds | 429 | 1 | You sent too many request and rate limit exceeded. |
| If any error occures in the server code | 500 |  | Database server was offline for a second and it caused the error. Or there was bug in the code. Etc. |

**Example 1**

```
Too many requests, please try again later.
```
