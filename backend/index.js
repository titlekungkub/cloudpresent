const config = require("./config.js")
const AWS = require("aws-sdk")
const fs = require("fs-extra")
const credentials = new AWS.SharedIniFileCredentials({
  profile: config.profile
})
AWS.config.credentials = credentials
AWS.config.update({ region: config.region })
const bucketName = config.bucket
const s3 = new AWS.S3()

let imagesDir = __dirname + "/" + config.imgDir

function uploadRefImageToS3(uploadfile, file_key) {
  return s3
    .upload({
      Bucket: bucketName,
      Body: uploadfile,
      Key: config.keyPath + file_key
    })
    .promise()
}

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err)
  }
  files
    .filter(file => !/(^|\/)\.[^\/\.]/g.test(file))
    .forEach(file => {
      let uploadfile = fs.readFileSync(imagesDir + "/" + file)
      let file_key = file
        .split(".")
        .slice(0, -1)
        .join(".")
      uploadRefImageToS3(uploadfile, file_key)
        .then(res => {
          console.log("Successfully uploaded " + res.Key)
        })
        .catch(err => {
          console.log(err)
        })
    })
})
