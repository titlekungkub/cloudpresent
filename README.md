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

Create the `config.js` file in both backend and frontend folder 
with your settings base on `config_template_frontend.js` and `config_template_backend.js`

### Running the project

After you finished setting up the configuration, You'll need to have some reference images in AWS S3.

#### In Backend folder

Run this follwing commands once to import your reference images:

```
node index.js
```

Then start the frontend application.

#### In Frontend folder

```
npm start
```

Go to http://localhost:3000/ in your browser, You'll see a simple website for uploading an image and you can export the result to a csv file.
