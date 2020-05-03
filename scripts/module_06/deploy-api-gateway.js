// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const apiG = new AWS.APIGateway()
const apiId = '/* TODO: Add api id */'

createDeployment(apiId, 'prod')
.then(data => console.log(data))

function createDeployment (apiId, stageName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create deployment
  })
}
