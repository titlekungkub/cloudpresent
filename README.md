## PRESENT (Cloud Technology Project)

An attendance checking system with a photo through AWS Rekognition service.

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
from __future__ import print_function

import boto3
from decimal import Decimal
import json
import urllib

print('Loading function')

rekognition = boto3.client('rekognition')


# --------------- Helper Functions to call Rekognition APIs ------------------

def index_faces(bucket, key, collection, studentid):
    # Note: Collection has to be created upfront. Use CreateCollection API to create a collecion.
    #rekognition.create_collection(CollectionId=collection)
    response = rekognition.index_faces(Image={"S3Object": {"Bucket": bucket, "Name": key}}, ExternalImageId=studentid, CollectionId=collection)
    return response


# --------------- Main handler ------------------

def lambda_handler(event, context):
    '''Demonstrates S3 trigger that uses
    Rekognition APIs to detect faces, labels and index faces in S3 Object.
    '''
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.unquote_plus(event['Records'][0]['s3']['object']['key'].encode('utf8'))
    try:

        # Calls rekognition IndexFaces API to detect faces in S3 object and index faces into specified collection
        folder = key.split('/reference')[0] # collection in format '2018/2/2110498'
        collection = folder.replace('/','-')
        studentid = key.split('reference/')[1] # studentid in format '5831001021'
        response = index_faces(bucket, key, collection, studentid)

        # Print response to console.
        print(response)

        return response
    except Exception as e:
        print(e)
        raise e
```

Then go to `frontend/src/component/UploadImage.js` and replace your API Gateway url that created above instead of `API_Gateway_URL` in this following function

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
from __future__ import print_function

import boto3
import io
from decimal import Decimal
import json
import urllib
import time
import numpy as np
import base64

import cv2

rekognition = boto3.client('rekognition')
s3 = boto3.client('s3')


# --------------- Helper Functions to call Rekognition APIs ------------------


def detect_faces(bucket, key):
    response = rekognition.detect_faces(Image={"S3Object": {"Bucket": bucket, "Name": key}})
    return response

def search_face(bucket, key, collection, boxwidth, boxheight, boxleft, boxtop):
    
    s3_connection = boto3.resource('s3')
    s3_object = s3_connection.Object(bucket,key)
    s3_response = s3_object.get()

    stream = io.BytesIO(s3_response['Body'].read())
    
    img = cv2.imdecode(np.fromstring(stream.read(), np.uint8), 1)

    imgheight, imgwidth, imgchannels = img.shape
    
    cropped = img[boxtop*imgheight:boxtop*imgheight+boxheight*imgheight, boxleft*imgwidth:boxleft*imgwidth+boxwidth*imgwidth]
    
    response = rekognition.search_faces_by_image(
    CollectionId=collection,
    Image={"Bytes": cv2.imencode('.jpg', cropped)[1].tostring()},
    MaxFaces=1
    )
    return response


# --------------- Main handler ------------------


def lambda_handler(event, context):

    #print("Received event: " + json.dumps(event, indent=2))

    encodedImg = json.loads(event['body'])['image_data'].split('base64,')[1]
    decodedImg = base64.b64decode(encodedImg)

    bucket = 'presentproject'
    key = '2018/2/2110498/attendance/' + time.strftime('%Y-%m-%d') + '.jpg'
    
    s3.put_object(
        Bucket=bucket,
        Key=key,
        Body=decodedImg
    )

    list_of_students = []
    
    folder = key.split('/attendance')[0] # collection in format '2018/2/2110498'
    collection = folder.replace('/','-')
    print(collection)
    
    try:
        # Calls rekognition DetectFaces API to detect faces in S3 object
        faces = detect_faces(bucket, key)
        
        for face in faces['FaceDetails']:
            print(face)
            # Calls rekognition SearchFaceByImage
            searchResponse = search_face(bucket, key, collection, face['BoundingBox']['Width'], face['BoundingBox']['Height'], face['BoundingBox']['Left'], face['BoundingBox']['Top'])
            print(searchResponse)
            if(searchResponse['FaceMatches']):
                id =  searchResponse['FaceMatches'][0]['Face']['ExternalImageId']
                list_of_students.append(id)
                print(id)

        print('Done.')
        print(list_of_students)

        s3.put_object(
            Bucket='presentproject',
            Key=folder+'/result/' + time.strftime('%Y-%m-%d') + '.csv',
            Body='\n'.join(list_of_students)
        )

        response = {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(list_of_students)
        }

        return response

    except Exception as e:
        print(e)

        
        response = {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'}
        }

        return response
        
        raise e
```

* Note that you also need to include OpenCV and Numpy libraries along with the Lambda function. This can be done using the upload .zip as the code entry type and include the required libraries in the same .zip file as the Lambda function code.

** You can also use [this](aws-lambda-python-opencv-prebuilt.zip) .zip which includes OpenCV and Numpy along with lambda_function.py.

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
