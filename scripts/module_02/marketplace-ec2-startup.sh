#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
git checkout aws_test
git pull origin aws_test
sudo npm i
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsCmNkIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2hlY2tvdXQgYXdzX3Rlc3QKZ2l0IHB1bGwgb3JpZ2luIGF3c190ZXN0CnN1ZG8gbnBtIGkKc3VkbyBucG0gcnVuIHN0YXJ0
