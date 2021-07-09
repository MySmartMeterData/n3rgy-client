# n3rgy API Client

[![NPM Version](https://img.shields.io/npm/v/n3rgy?style=flat-square)](https://www.npmjs.org/package/n3rgy)

This library provides convenient access to the [n3rgy](https://data.n3rgy.com/consumer/home) API form server-side and browser based applications.

This client is part of the open-source [MySmartMeterData.io](https://MySmartMeterData.io) project, a dashboard for
retrieving and displaying gas and electricity smart meter data.

## Contents

- [n3rgy API Client](#n3rgy-api-client)
  - [Contents](#contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Register with n3rgy](#register-with-n3rgy)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Configuration Options](#configuration-options)
      - [`offsetConsumptionTimestamps`](#offsetconsumptiontimestamps)
      - [`maxDaysPerRequest`](#maxdaysperrequest)
    - [Response Schema](#response-schema)
    - [Handling Errors](#handling-errors)
    - [Instance Methods](#instance-methods)
      - [`getGasConsumption(start?, end?)`](#getgasconsumptionstart-end)
      - [`getGasTariff(start?, end?)`](#getgastariffstart-end)
      - [`getElectricityConsumption(start?, end?)`](#getelectricityconsumptionstart-end)
      - [`getElectricityProduction(start?, end?)` (NOT YET IMPLEMENTED)](#getelectricityproductionstart-end-not-yet-implemented)
      - [`getElectricityTariff(start?, end?)`](#getelectricitytariffstart-end)
  - [Contributing](#contributing)
    - [Issues and feature requests](#issues-and-feature-requests)
    - [Pull request process](#pull-request-process)
  - [Licence](#licence)

## Features

- Promise based and fully typed.
- Parses the varying date/time formats used in the raw API responses into a single format (ISO 8601).
- Allows for greater amounts of data to be collected from an endpoint by performing multiple requests and merging the responses. The raw API imposes a limit of 90-days in a single request.

## Getting Started

### Register with n3rgy

Before being able to use the API, you must have registered your smart meters with [n3rgy](https://data.n3rgy.com/consumer/sign-up)
and given consent to access your usage data.

To register, you will need to know your MPAN (Meter Point Administration Number) or MPRN (Meter Point Reference Number) in addition
to your IHD (In-Home Display) MAC Address or CIN value that is used for authentication to the API.

### Installation

```sh
npm install n3rgy --save
# or
yarn add n3rgy
```

## Usage

The most basic usage requires the passing of your n3rgy access token as the first constructor argument.

Your access token will be your 16-digit In-Home Display (IHD) MAC Address or CIN value.

Any desired [configuration options](#configuration-options) can be passed as an object to the second argument.

```js
import { N3rgy } from 'n3rgy'

const n3rgyClient = new N3rgy('YOUR_ACCESS_TOKEN', {
  // Configuration options here
})

n3rgyClient.getElectricityConsumption()
  .then((response) => console.log(response))
  .catch((err) => console.error(err))
```

### Configuration Options

#### `offsetConsumptionTimestamps`

| Type    | Required | Default Value |
| ------- | -------- | ------------- |
| boolean | false    | false         |

The API reports consumption values at the end of each 30 minutes; sometimes, this is not desirable.

For example, usage for the 30 minutes` 23:30 to 00:00 on 1st January` would be associated with the
reading reported at `00:00 on 2nd January` by the API. Setting this option to `true` will offset each timestamp by minus 30-minutes.

#### `maxDaysPerRequest`

| Type   | Required | Default Value |
| ------ | -------- | ------------- |
| number | false    | 90            |

The API imposes a limit of obtaining 90 days worth of data in a single request. When provided with a date range of >90 days, this library will split requests into smaller batches and merge the responses. Setting this option will change the number of days per batch.

**Note:** The value for this option must be ≤90. A smaller value than 90 will result in more requests being made to the API.

### Response Schema

The response you will receive from all methods contains the following information:

```js
{
  // `data` is the response from the API after processing according to the set options
  data: {},

  // `originalData` is the original unmodified response/responses provided by the API.
  originalData: []
}
```

When using `then`, you will receive the response as follows:

```js
n3rgy.getElectricityConsumption()
  .then(response => {
    console.log(response.data)
    console.log(response.originalData)
  })
```

When using `catch`, the response will be available through the error object as explained in the [Handling Errors](#handling-errors) section.

### Handling Errors

```js
n3rgy.getElectricityConsumption()
  .catch(error => {
    console.error(error)
  })
```

### Instance Methods

Unless otherwise specified, all methods will take the following arguments:

| Argument | Type        | Required | Default | Notes                                                                                                                                   |
| -------- | ----------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| start    | string/date | No       | null    | Can receive a date as a string in ISO 8601 format or a JavaScript date object. If blank, the API will return data for the previous day. |
| end      | string/date | No       | null    | Can receive a date as a string in ISO 8601 format or a JavaScript date object. If blank, the API will return data for the previous day. |

#### `getGasConsumption(start?, end?)`

Retrieves gas consumption data.

**Example**

```js
n3rgy.getGasConsumption("2021-01-01T00:00:00.000Z", "2021-01-31T23:59:00.000Z")
```

#### `getGasTariff(start?, end?)`

Retrieves gas tariff data.

**Example**

```js
n3rgy.getGasTariff("2021-01-01T00:00:00.000Z", "2021-01-31T23:59:00.000Z")
```

#### `getElectricityConsumption(start?, end?)`

Retrieves electricity consumption data.

**Example**

```js
n3rgy.getElectricityConsumption("2021-01-01T00:00:00.000Z", "2021-01-31T23:59:00.000Z")
```

#### `getElectricityProduction(start?, end?)` (NOT YET IMPLEMENTED)

> ❗️**NOT YET IMPLEMENTED:** This method is not yet implemented due to a requirement, for example, responses
> from the production endpoint to be provided. Please see
> [GitHub Issue #1](https://github.com/MySmartMeterData/n3rgy-client/issues/1) for more information.

Retrieves electricity production data.

**Example**

```js
n3rgy.getElectricityProduction("2021-01-01T00:00:00.000Z", "2021-01-31T23:59:00.000Z")
```

#### `getElectricityTariff(start?, end?)`

Retrieves electricity tariff data.

**Example**

```js
n3rgy.getElectricityTariff("2021-01-01T00:00:00.000Z", "2021-01-31T23:59:00.000Z")
```


## Contributing

This is an active open-source project. We are always open to people who want to use our code and contribute to it.

### Issues and feature requests

To report a bug or request a new feature, please open an issue.

### Pull request process

1. Search the repository for open and closed issues and pull requests that relate to your submission. You don't want to duplicate effort.
2. Your pull request will only be merged once it has met the following criteria:
   - A review has taken place by a maintainer
   - Any review points have been addressed
   - All tests have successfully passed

## Licence

This project is licenced under the [MIT License](LICENSE).
