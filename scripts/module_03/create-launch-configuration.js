const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC_ss_3'
const roleName = 'hamsterLCRole_ss_3'
const sgName = 'hamster_ss_sg_3'
const keyName = 'hamster_ss_key_3'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
  console.log("profileArn: " + profileArn)
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: 'ami-0c14c67446448abbb',
    InstanceType: 't2.micro',
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [
        sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKY2hvd24gLVIgYml0bmFtaTogL2hvbWUvYml0bmFtaS9oYmZsCmNkIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2hlY2tvdXQgYXdzX3Rlc3QKZ2l0IHB1bGwgb3JpZ2luIGF3c190ZXN0CnN1ZG8gbnBtIGkKc3VkbyBucG0gcnVuIHN0YXJ0'
  }

  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}
