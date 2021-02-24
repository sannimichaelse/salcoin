#!/bin/bash
#===============================================================================
#
#       SERVER DEPLOYMENT
#
#		@author: Sanni Michael Tomiwa.
#
#===============================================================================

echo -e ""
echo -e "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *"
echo -e "*                                                               *"
echo -e "* SCRIPT INFO: Deploying staging salcoin.             *"
echo -e "*                                                               *"
echo -e "* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n"

# Remove files/folder
echo "Removing old files..."
rm -rf Dockerfile
rm -rf node_modules


# Copy files
echo "Copying new files..."
cp -r .env-staging .env
cp -r dockerfile-staging Dockerfile


# Run docker
docker rm -f salcoin
docker rmi salcoin
docker build -t salcoin .
docker run \
    --name salcoin \
    --restart=always \
    -p 9001:9001 \
    -v /opt/.pm2/salcoin:/opt/.pm2/salcoin \
    -v /etc/timezone:/etc/timezone \
    -v /etc/localtime:/etc/localtime \
    -d \
    salcoin


# End