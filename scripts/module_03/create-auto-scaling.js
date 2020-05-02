// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG_ss'
const lcName = 'hamsterLC_ss'
const policyName = 'hamsterPolicy_ss'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-1:331252955957:targetgroup/hamsterTG-ss/0f195d372bf50fe2'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
  const params = {
    AutoScalingGroupName: asgName,
    AvailabilityZones: [
        "us-east-1a",
        "us-east-1b"
    ],
    TargetGroupARNs: [
        tgArn
    ],
    LaunchConfigurationName: lcName,
    MaxSize: 2,
    MinSize: 1
  }

  return new Promise((resolve, reject) => {
      autoScaling.createAutoScalingGroup(params, (err, data) => {
          if(err) reject(err)
          else resolve(data)
      })
    })
}

function createASGPolicy (asgName, policyName) {
  const params = {
    AdjustmentType: 'ChangeInCapacity',
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: 'TargetTrackingScaling',
    TargetTrackingConfiguration: {
        TargetValue: 5,
        PredefinedMetricSpecification: {
            PredefinedMetricType: 'ASGAverageCPUUtilization'
        }
    }
  }

  return new Promise((resolve, reject) => {
      autoScaling.putScalingPolicy(params, (err, data) => {
          if(err) reject(err)
          else resolve(data)
      })
    })
}
