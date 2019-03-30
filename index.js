// Load the SDK and UUID
var AWS = require('aws-sdk')
var fs = require('fs-extra')
var credentials = new AWS.SharedIniFileCredentials({ profile: 'present' })
AWS.config.credentials = credentials
AWS.config.update({ region: 'ap-northeast-1' })

const rekognition = new AWS.Rekognition()

// Create unique bucket name
var bucketName = 'presentproject'

// Create a promise on S3 service object
var s3 = new AWS.S3()

// Handle promise fulfilled/rejected states

function uploadRefImage(uploadfile, studentID, courseID) {
  return s3
    .upload({
      Bucket: bucketName,
      Body: uploadfile,
      Key: '2018/2/' + courseID + '/reference/' + studentID
    })
    .promise()
}

function uploadAttendanceImage(uploadfile, date, courseID) {
  return s3
    .upload({
      Bucket: bucketName,
      Body: uploadfile,
      Key: '2018/2/' + courseID + '/attendance/' + date
    })
    .promise()
}

var uploadfile = fs.readFileSync('C:/Users/March/Desktop/profile33.png')
uploadRefImage(uploadfile, '5831071821', '2110498').then(res => {
  console.log('Successfully uploaded' + res.Key)
})

var params = {
  SimilarityThreshold: 90,
  SourceImage: {
    S3Object: {
      Bucket: bucketName,
      Name: '2018/2/2110498/reference/5831071821'
    }
  },
  TargetImage: {
    S3Object: {
      Bucket: bucketName,
      Name: '2018/2/2110498/attendance/5831071821'
    }
  }
}
rekognition.compareFaces(params, function(err, data) {
  if (err) console.log(err, err.stack)
  // an error occurred
  else console.log(data) // successful response
  /*
     data = {
      FaceMatches: [
         {
        Face: {
         BoundingBox: {
          Height: 0.33481481671333313, 
          Left: 0.31888890266418457, 
          Top: 0.4933333396911621, 
          Width: 0.25
         }, 
         Confidence: 99.9991226196289
        }, 
        Similarity: 100
       }
      ], 
      SourceImageFace: {
       BoundingBox: {
        Height: 0.33481481671333313, 
        Left: 0.31888890266418457, 
        Top: 0.4933333396911621, 
        Width: 0.25
       }, 
       Confidence: 99.9991226196289
      }
     }
     */
})
