#!/usr/bin/env bash

docker-compose -f docker-compose.dev.yaml down
docker volume rm docker_mysql_dev_data
docker volume rm docker_mysql_test_data
docker-compose -f docker-compose.dev.yaml up
