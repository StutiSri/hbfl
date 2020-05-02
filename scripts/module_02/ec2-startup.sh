#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
git clone https://github.com/StutiSri/hbfl.git
cd hbfl
git checkout aws_test
npm i
npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzEyLnggfCBzdWRvIGJhc2ggLQpzdWRvIHl1bSBpbnN0YWxsIC15IG5vZGVqcwpzdWRvIHl1bSBpbnN0YWxsIC15IGdpdApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL1N0dXRpU3JpL2hiZmwuZ2l0CmNkIGhiZmwKZ2l0IGNoZWNrb3V0IGF3c190ZXN0Cm5wbSBpCm5wbSBydW4gc3RhcnQ=
