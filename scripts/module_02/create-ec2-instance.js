// Imports
const AWS = require ('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: "us-east-1"})

// Declare local variables

const ec2 = new AWS.EC2()

const sgName = 'hamster_ss_sg_3'
const keyName = 'hamster_ss_key_3'

// Do all the things together
createSecurityGroup(sgName)
.then(() => {
  return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
  return createInstance(sgName, keyName)
})
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions

function createSecurityGroup (sgName) {
  const params = {
    Description: sgName,
    GroupName: sgName
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
        if(err){
            reject(err)
        }else{
            const params = securityGroupParams(data)
            ec2.authorizeSecurityGroupIngress(params, (err) => {
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        }
    })

  })
}

function createKeyPair (keyName) {
  const params = {
    KeyName: keyName
  }

  return new Promise((resolve, reject) => {
    ec2.createKeyPair(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}

function createInstance (sgName, keyName) {
  console.log("create instance")
  const params = {
    ImageId: 'ami-0323c3dd2da7fb37d',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
        sgName
    ],


  }

  return new Promise((resolve, reject) => {
  console.log("run instances")
    ec2.runInstances(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })

}

function securityGroupParams(data){
    return {
               GroupId: data.GroupId,
               IpPermissions: [
                   {
                    IpProtocol: 'tcp',
                    FromPort: 22,
                    ToPort: 22,
                    IpRanges: [
                       {
                           CidrIp: '0.0.0.0/0'
                       }
                    ]
                   },
                   {
                    IpProtocol: 'tcp',
                    FromPort: 3000,
                    ToPort: 3000,
                    IpRanges: [
                       {
                           CidrIp: '0.0.0.0/0'
                       }
                    ]
                   }
               ]
           }
}