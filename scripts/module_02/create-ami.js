// Imports
const AWS = require ('aws-sdk')

AWS.config.update({region: "us-east-1"})

// Declare local variables
const ec2 = new AWS.EC2()

createImage('i-0df0ea6e269f71712', 'hamsterImage_ss')
.then(() => console.log('Complete'))

function createImage (seedInstanceId, imageName) {
  return new Promise((resolve, reject) => {
        const params = {
            InstanceId: seedInstanceId,
            Name: imageName
        }
        ec2.createImage(params, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
  })
}
