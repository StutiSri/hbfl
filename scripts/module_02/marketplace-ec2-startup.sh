#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
git clone https://github.com/StutiSri/hbfl.git
git checkout aws_test
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
sudo npm i
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9TdHV0aVNyaS9oYmZsLmdpdApnaXQgY2hlY2tvdXQgYXdzX3Rlc3QKY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsCmNkIC9ob21lL2JpdG5hbWkvaGJmbApzdWRvIG5wbSBpCnN1ZG8gbnBtIHJ1biBzdGFydA==
