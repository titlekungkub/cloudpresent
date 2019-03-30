// Load the SDK and UUID
var AWS = require('aws-sdk')
var fs = require('fs-extra')
var credentials = new AWS.SharedIniFileCredentials({ profile: 'present' })
AWS.config.credentials = credentials
AWS.config.update({ region: 'ap-northeast-1' })

// Create unique bucket name
var bucketName = 'presentproject'

// Create a promise on S3 service object
var s3 = new AWS.S3()

// Handle promise fulfilled/rejected states

function uploadImage(uploadfile, studentID, courseID) {
  return s3
    .upload({
      Bucket: bucketName,
      Body: uploadfile,
      Key: '2018/2/' + courseID + '/' + studentID
    })
    .promise()
}

var uploadfile = fs.readFileSync('C:/Users/March/Desktop/profile33.png')
uploadImage(uploadfile, '5831071821', '2110498').then(res => {
  console.log('Successfully uploaded' + res.Key)
})
