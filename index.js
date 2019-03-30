// Load the SDK and UUID
var AWS = require('aws-sdk')
var credentials = new AWS.SharedIniFileCredentials({ profile: 'present' })
AWS.config.credentials = credentials
AWS.config.update({ region: 'ap-northeast-1' })

// Create unique bucket name
var bucketName = 'presentproject'

// Create name for uploaded object key
var keyName = 'hello_world.txt'

// Create a promise on S3 service object
var bucketPromise = new AWS.S3()

// Handle promise fulfilled/rejected states
bucketPromise
  .then(function(data) {
    // Create params for putObject call
    var objectParams = {
      Bucket: bucketName,
      Key: keyName,
      Body: 'Hello World!'
    }
    // Create object upload promise
    var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' })
      .putObject(objectParams)
      .promise()
    uploadPromise.then(function(data) {
      console.log('Successfully uploaded data to ' + bucketName + '/' + keyName)
    })
  })
  .catch(function(err) {
    console.error(err, err.stack)
  })
