#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
cd /home/bitnami/hbfl
git checkout aws_test
git pull origin aws_test
sudo npm i
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKY2QgL2hvbWUvYml0bmFtaS9oYmZsCmdpdCBjaGVja291dCBhd3NfdGVzdApnaXQgcHVsbCBvcmlnaW4gYXdzX3Rlc3QKc3VkbyBucG0gaQpzdWRvIG5wbSBydW4gc3RhcnQ=
