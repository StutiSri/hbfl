const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const sns = new AWS.SNS()
const TOPIC_ARN = '/* TODO: Add your topic arn */'

function publish (msg) {
  // TODO: Create params const object

  return new Promise((resolve, reject) => {
    // TODO: Publish message
  })
}

module.exports = { publish }
