// // Load the SDK and UUID
// var AWS = require('aws-sdk')
// var fs = require('fs-extra')
// var credentials = new AWS.SharedIniFileCredentials({ profile: 'present' })
// AWS.config.credentials = credentials
// AWS.config.update({ region: 'ap-northeast-1' })

// const rekognition = new AWS.Rekognition()

// // Create unique bucket name
// var bucketName = 'presentproject'

// // Create a promise on S3 service object
// var s3 = new AWS.S3()

// // Handle promise fulfilled/rejected states

// function uploadRefImage(uploadfile, studentID, courseID) {
//   return s3
//     .upload({
//       Bucket: bucketName,
//       Body: uploadfile,
//       Key: '2018/2/' + courseID + '/reference/' + studentID
//     })
//     .promise()
// }

// function uploadAttendanceImage(uploadfile, date, courseID) {
//   return s3
//     .upload({
//       Bucket: bucketName,
//       Body: uploadfile,
//       Key: '2018/2/' + courseID + '/attendance/' + date
//     })
//     .promise()
// }

// // var uploadfile = fs.readFileSync('C:/Users/March/Desktop/profile33.png')
// // uploadRefImage(uploadfile, '5831071821', '2110498').then(res => {
// //   console.log('Successfully uploaded' + res.Key)
// // })
// var paramsS3 = {
//   Bucket: bucketName /* required */,
//   MaxKeys: 20,
//   Prefix: '2018/2/2110498/reference/'
// }
// s3.listObjects(paramsS3, function(err, data) {
//   if (err) console.log(err, err.stack)
//   // an error occurred
//   else console.log(data) // successful response
// })

// var paramsReg = {
//   SimilarityThreshold: 90,
//   SourceImage: {
//     S3Object: {
//       Bucket: bucketName,
//       Name: '2018/2/2110498/reference/5831071821'
//     }
//   },
//   TargetImage: {
//     S3Object: {
//       Bucket: bucketName,
//       Name: '2018/2/2110498/attendance/5831071821'
//     }
//   }
// }
// // rekognition.compareFaces(paramsReg, function(err, data) {
// //   if (err) console.log(err, err.stack)
// //   // an error occurred
// //   else console.log(data) // successful response
// // })

const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.static("public"))
app.use(cors())
const fs = require("fs-extra")
const port = 5555
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const formidable = require("formidable")

app.listen(port, () => {
  console.log("server is running on port " + port)
})

app.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    console.log(files.image)
    res.send("Success")
  })
})
