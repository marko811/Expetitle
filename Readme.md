# EXPETITLE

## Using docker for unit testing

```sh
# Will start the container using docker-compose
# After you can join it and run tests inside
./service_start.sh
# Join recently started container with docker-compose
./service_join.sh
# Stop container
docker-compose stop

# OR

# Will execute the unittests inside of container and leave, without using docker-compose
./service_test.sh
```

## Runnign unittests

```sh
# Full set of tests
jest

# Some tests that matching the template
jest shareUpdate
```

### React Native Installation

This page will help you install and build your first React Native app.
https://reactnative.dev/docs/getting-started
Choose => `React Native CLI Quickstart`
Development OS => `Mac`, `Android`,`Linux` [Choose Your's]
Target OS => `iOS`, `Android`

### Project Installation

Install the dependencies and devDependencies.
User [VSCode (https://code.visualstudio.com/download)]
`Ctrl + Esc` to open Terminal in VSCode.

```sh
$ cd exp-mobile
$ yarn install
$ react-native link
```

Install Pods for iOS

```sh
$ cd ios && pod install
$ cd ..
```

`#ANDROID`
Sync-up Project with Android Studio
First Step:

```sh
Open Android Studio
=> Import Project
=> exp-mobile => Android => App => build.gradle
```

It will sync Project with Filesystem & Gradle.
To run in simulator, Select any installed Simulator and Run
In `VSCode Termainl`

```sh
$ yarn start [or] react-native start
```

Running this command will execute the script.

`#TEST LOGIN ACCOUNT`

```
email: expuser0@mail.com
password: somthing123
```

`#IOS`
First Step:

```sh
Open XCODE
=> Import Another Project
=> exp-mobile => iOS => Expetitle.xcworkspace
```

It will index & build Project files. Then choose any Emulator e.g iPhone 11 Pro Max from Emulator List and run it.

In `VSCode Termainl`

```sh
$ yarn start [or] react-native start
```

Running this command will execute the script.

### How to change API URL

We are using .env to setup the API URL
there are two `.env.prod` and `.env.dev` samples, that you can use.
The final file should be named: `.env`

`#PROJECT FOLDER`
First Step:

```sh
exp-mobile/src/services/Api.js
```

You can change base api from here => import { STAGING_URL } from 'react-native-dotenv';
