const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC_ss_2'
const roleName = 'hamsterLCRole_ss_2'
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
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKY2QgL2hvbWUvYml0bmFtaS9oYmZsCmdpdCBjaGVja291dCBhd3NfdGVzdApnaXQgcHVsbCBvcmlnaW4gYXdzX3Rlc3QKc3VkbyBucG0gaQpzdWRvIG5wbSBydW4gc3RhcnQ='
  }

  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}
