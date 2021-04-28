# EMPLOYEE SERVICE


## Development

### Initialize environment and Install dependancy
```
  mocli lambda exif init
```

### Get cache exported port by k8s

- Because the exported port of redis server was changed randomly when k8s service has been restarted

```
kubectl get services | grep redis
```

### Set env cache port for local in serverless.yml
```
REDIS_ENDPOINT: api.metadefender.local:<cache_port>
```

### Setup AWS profile for serverless
- You can setup aws profile name `rest-app` with `aws_access_key_id` and `aws_secret_access_key` of `mdc-secret`
```
  AWS_APIKEY=****
  AWS_SECRETKEY=****
```
## Testing:
### Case success:

- Step 1: Upload new image file using endpoint: `https://{{host}}/v4/file`
- Step 2: Get `stored_at` of file data from database, we will have bucket and key of uploaded file.
- Step 3: Set file key to `events/event-s3.json` file:
  ```
    "s3": {
      "s3SchemaVersion": "1.0",
      "configurationId": "testConfigRule",
      "bucket": {
        "name": "staging-g.files.metadefender.com",
        "ownerIdentity": {
          "principalId": "EXAMPLE"
        },
        "arn": "arn:aws:s3:::staging-g.files.metadefender.com"
      },
      "object": {
        "key": "<file_key>",
        "size": 1024,
        "eTag": "439ef75692f7977d7dbfaeebbe317d48",
        "sequencer": "0A1B2C3D4E5F678901"
      }
    }
  ```
- Step 4: Invoke lambda function local
  ```
    serverless invoke local -f exif --path events/event-s3.json
  ```
- Step 5: Get exif by enpoint `https://{{host}}/v4/hash/{{exif_hash}}/exif`
### Case failed:
- Step 1: Upload new image file using endpoint: `https://{{host}}/v4/file`
- Step 2: Get `stored_at` of file data from database, we will have bucket and key of uploaded file.
- Step 3: Set file key to `events/event-s3.json` file:
  ```
    "s3": {
      "s3SchemaVersion": "1.0",
      "configurationId": "testConfigRule",
      "bucket": {
        "name": "staging-g.files.metadefender.com",
        "ownerIdentity": {
          "principalId": "EXAMPLE"
        },
        "arn": "arn:aws:s3:::staging-g.files.metadefender.com"
      },
      "object": {
        "key": "<file_key>",
        "size": 1024,
        "eTag": "439ef75692f7977d7dbfaeebbe317d48",
        "sequencer": "0A1B2C3D4E5F678901"
      }
    }
  ```
- Step 4: Delete file on S3
- Step 5: Invoke lambda function local
  ```
    serverless invoke local -f exif --path events/event-s3.json
  ```
- Step 5: Get exif by enpoint `https://{{host}}/v4/hash/{{exif_hash}}/exif`
  - The return of endpoint should be
  ```
    "details": {
            "message": "Entity was not found",
            "name": "Client Error",
            "code": 404001,
            "status": 404
        }
  ```

> Cache of image file will expired after 15 mins.

## Deployment:
- Step 1: Build lambda dependancies and compress source to zip file
    ```
        mocli lambda exif build
    ```
- Step 2: Deploy zip file to s3 directory
    ```
        mocli lambda exif deploy <env (dev | qa | prod )>
    ```
> Currently, our credential only have permission to deploy to QA and Dev env
- Step 3: Publish function
    ```
        mocli lambda exif publish <env (dev | qa | prod )>
    ```
> If it show message: "Exif: function ${FUNC_NAME} not found. Please contact your administrator to create your lambda function first". Which mean your lambda function was not created yet, please create your lambda function first.
