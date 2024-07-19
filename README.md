# Yellowbox - device online status

## Description

Problem description is given in the [fetch-pq-exercise-with-instructions.ts](src/fetch-pq-exercise-with-instructions.ts).

## Assumptions

1. Given an external endpoint API `https://api.example.com/deviceOnlineStatus/{deviceId}`
2. The endpoint can only query a single device
3. The endpoint can accept 5 concurrent connections
4. Every connection takes between 1-3 seconds to complete

## Solutions Parts

### External endpoint API - mock server

- [deviceOnlineStatus](src/mocks/handlers/deviceOnlineStatus.ts)

### Back-end - consuming the external endpoint API

- [Facade / Front-server API](src/index.ts)

  This can be a Facade / Aggregator / Front-server, serving the client or other app.
  Currently generating deviceIds from 1..NUMBERS_OF_DEVICES, and call the __device status fetcher__.

- [Device status fetcher](src/fetch-pq.ts)
  - Break down the input deviceIds into group of 5,
  - Inquire the external endpoint API in batches
  - Aggregate the batch results into a single JSON object
  - Handle possible errors gracefully

## Deployment / Execution

Run `npm run dev` to start the the development mode.

This will start the application and watch for any file code change.
Result execution is output on the console.

## Sample result

<details>
  <summary>
    For sample result
    <br/><i>Please click here to expand</i>
  </summary>


```bash
➜  interview_yellowbox > npm run dev

> devices-status@1.0.0 dev
> nodemon

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,json
[nodemon] starting `node --inspect -r ts-node/register src/index.ts`
Debugger listening on ws://127.0.0.1:9229/204ed2fc-7bef-4abe-857a-a1737c6c0727
For help, see: https://nodejs.org/en/docs/inspector
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/1
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/2
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/3
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/4
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/5
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/6
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/7
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/8
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/9
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/10
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/11
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/12
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/13
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/14
---------- Outgoing: GET https://api.example.com/deviceOnlineStatus/15
Devices status:  {
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": false,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
  "10": false,
  "11": true,
  "12": true,
  "13": false,
  "14": true,
  "15": false
}
[nodemon] clean exit - waiting for changes before restart
```

</details>
