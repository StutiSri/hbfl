// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_ss_sg_3'
const keyName = 'hamster_ss_key_3'
const instanceId = 'i-0afd6c105d08c753e' //deleted the ec2 created from bitnami ami, so terminating the ec2
//created by the autoscaling group

stopInstance(instanceId)
.then(() => createInstance(sgName, keyName))
.then((data) => console.log('Created instance with:', data))

function createInstance (sgName, keyName) {
console.log("createInstance")
  const params = {
    ImageId: 'ami-0323c3dd2da7fb37d',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    Placement: {
      AvailabilityZone: 'us-east-1a'
    },
    SecurityGroups: [
      sgName
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function stopInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }

  return new Promise((resolve, reject) => {
  console.log("stop")
  ec2.stopInstances(params, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
