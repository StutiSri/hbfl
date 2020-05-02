// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-06b6716e9ba865cf7' //vol id of the stopped instance
const instanceId = 'i-0b6997de4b15c36a8' //instance created by module_04/create-ec2-instance

//detachVolume(volumeId)
//.then(() => attachVolume(instanceId, volumeId))

attachVolume(instanceId, volumeId)

function detachVolume (volumeId) {
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}

function attachVolume (instanceId, volumeId) {
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}
