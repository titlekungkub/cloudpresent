## PRESENT! (Cloud Computing Project)

An attendance checking system with an image using AWS's Rekognition service.

### How to install

```
git clone https://github.com/titlekungkub/cloudpresent.git
```

Run this follwing command in both backend and frontend folder:

    npm install
    

### Basic Configuration

[Create IAM user](https://docs.aws.amazon.com/en_us/IAM/latest/UserGuide/id_users_create.html)
 with `AmazonS3FullAccess` permission

Set credentials in the AWS credentials profile file on your local system, located at:
   
- ~/.aws/credentials on Linux, macOS, or Unix
   
- C:\Users\USERNAME\.aws\credentials on Windows
  
and this file should contain lines in the following format:

    [default]
    aws_access_key_id = <your access key id>
    aws_secret_access_key = <your secret key>
 
In backend folder, Create folder `refImages` for reference image of your student in class and save individual student's image within this folder 

#### Build an API with Lambda Proxy Integration

Following this [tutorial](https://docs.aws.amazon.com/en_us/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html) to deploy an API for uploading and analyzing attendance image.

For Lambda Function, copy/paste the following code:

```
code for lambda function upload attendance image
```

Then go to `frontend/src/component/UploadImage.js` and replace your API Gateway url that created above in this follwing function instead of `API_Gateway_URL`

```
handleOnChange(e) {
    this.setState({
      isUploaded: true,
      isAnalyzing: true
    })
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
      axios
        .post(
          // replace this with AWS API Gateway URL
          "API_Gateway_URL",
          JSON.stringify({ image_data: this.state.imagePreviewUrl })
        )
        .then(res => {
          let checklist = res.data.map(item => ({ name: item }))
          this.props.onClickUpload(checklist)
          this.setState({
            isAnalyzing: false
          })
        })
    }
    reader.readAsDataURL(file)
  }
```

#### Using AWS Lambda with Amazon S3

Following this [tutorial](https://docs.aws.amazon.com/en_us/lambda/latest/dg/with-s3-example.html) to trigger your Lambda function with AWS S3 event for `Adding Faces to a Collection` of AWS Rekognition.

For Lambda Function, copy/paste the following code:

```
code for lambda function trigger from S3
```

Create the `config.js` file in backend folder 
with your settings base on `config_template_backend.js`

### Running the project

After you finished setting up the configuration, You'll need to have some reference images in AWS S3.

#### In Backend folder

Run this follwing command once to import your reference images:

```
node index.js
```

Then start the frontend application.

#### In Frontend folder

```
npm start
```

Go to http://localhost:3000/ in your browser, You'll see a simple website for uploading an image and you can export the result to a csv file.
