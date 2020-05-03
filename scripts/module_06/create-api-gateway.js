// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const apig = new AWS.APIGateway()
const apiName = 'hamster-api-ss'

let apiData

createRestApi(apiName)
.then((data) => {
  apiData = data
  return getRootResource(apiData)
})
.then(rootResourceId => createResource(rootResourceId, 'hbfl', apiData))
.then(hbflResourceId => createResourceMethod(hbflResourceId, 'GET', apiData))
.then(hbflResourceId => createMethodIntegration(hbflResourceId, 'GET', apiData))
.then(hbflResourceId => createResource(hbflResourceId, '{proxy+}', apiData))
.then(proxyResourceId => createResourceMethod(proxyResourceId, 'ANY', apiData, 'proxy'))
.then(proxyResourceId => createMethodIntegration(proxyResourceId, 'ANY', apiData, 'proxy'))
.then(data => console.log(data))

function createRestApi (apiName) {
  console.log("create rest api" + apiName)
  const params = {
    name: apiName
  }

  return new Promise((resolve, reject) => {
    apig.createRestApi(params, (err, data) => {
        if(err) reject(err)
        else resolve(data)
    })
  })
}

function getRootResource (api) {
   console.log("create root resource " + api.id)
      const params = {
      restApiId: api.id
    }

  return new Promise((resolve, reject) => {
    apig.getResources(params, (err, data) => {
        if(err) reject(err)
        else {
            const rootResource = data.items.find(r => r.path === '/')
            resolve(rootResource.id)
        }
    })
  })
}

function createResource (parentResourceId, resourcePath, api) {
    console.log("create resource " + resourcePath)
const params = {
     parentId: parentResourceId,
     pathPart: resourcePath,
     restApiId: api.id
 }

  return new Promise((resolve, reject) => {
    apig.createResource(params, (err, data) => {
        if(err) reject(err)
        else resolve(data.id)
    })
  })
}

function createResourceMethod (resourceId, method, api, path) {
  console.log("createResourceMethod " + resourceId + " " + path)
  const params = {
    authorizationType: 'NONE',
    httpMethod: method,
    resourceId: resourceId,
    restApiId: api.id
  }

  if (path){
      params.requestParameters = {
          [`method.request.path.${path}`]: true
      }
  }

  return new Promise((resolve, reject) => {
    apig.putMethod(params, (err) => {
        if(err) reject(err)
        else resolve(resourceId)
    })
  })
}

function createMethodIntegration (resourceId, method, api, path) {
  console.log("createMethodIntegration " + resourceId + " " + path)
  const params = {
    httpMethod: method,
    resourceId: resourceId,
    restApiId: api.id,
    integrationHttpMethod: method,
    type: 'HTTP_PROXY',
    uri: 'http://hamsterelb-ss-492552533.us-east-1.elb.amazonaws.com'
  }

  if (path){
      params.uri += `/{${path}}`
      params.requestParameters = {
          [`integration.request.path.${path}`]: `method.request.path.${path}`
      }
  }

  return new Promise((resolve, reject) => {
    apig.putIntegration(params, (err) => {
        if(err) reject(err)
        else resolve(resourceId)
    })
  })
}
