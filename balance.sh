#!/bin/bash

screen -dmS "index"
screen -r "index" -X stuff $'node /home/barrel/Projects/binance_reporter/index.js\n' 