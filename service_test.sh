#!/bin/bash

docker run -v $PWD:/root/app -it "$(docker build -q .)" /bin/bash -c "yarn; jest"