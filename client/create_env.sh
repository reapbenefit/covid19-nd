#!/bin/bash

read -p "Please enter your Google Maps API Key: " maps_api_key

mkdir ./src/environments

echo "export const environment = {
  production: true,
  maps_api_key: '$maps_api_key'
};" > ./src/environments/environment.prod.ts

echo "export const environment = {
  production: false,
  maps_api_key: '$maps_api_key'
};" > ./src/environments/environment.ts
