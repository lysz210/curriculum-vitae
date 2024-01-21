import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as glob from 'glob';
import * as mime from 'mime';
import * as AdmZip from 'adm-zip'

const configs = new pulumi.Config();
const PublicRead = aws.s3.CannedAcl.PublicRead;

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("cv.lysz210.name", {
    bucket: 'cv.lysz210.name',
    acl: PublicRead,
    website: {
        indexDocument: "index.html",
        routingRules: [
            {
                Condition: {
                    HttpErrorCodeReturnedEquals: '404'
                },
                Redirect: {
                    ReplaceKeyWith: 'en'
                }
            }
        ]
    },
    corsRules: [
        {
            allowedMethods: ['GET'],
            allowedOrigins: ['*']
        }
    ]
});

// load all files
const dist = '../.output/public/';

glob.sync('**/*', {
    cwd: dist,
    nodir: true,
    stat: true
}).forEach(file => {
    const filePath = `${dist}${file}`;
    const mimeType = mime.getType(filePath);
    console.log(">> file ", file, mimeType)
    new aws.s3.BucketObject(file, {
        bucket: bucket.id,
        source: new pulumi.asset.FileAsset(filePath),
        acl: PublicRead,
        contentType: mimeType || undefined
    })
})

const zip = new AdmZip()
zip.addLocalFolder('../.output/server')
zip.writeZip('./server.zip')
// create server lambda
const lambdaServer = new aws.lambda.Function("apiCvLysz210", {
    role: 'arn:aws:iam::843380199157:role/service-role/lambda_basic_execution',
    handler: 'index.handler',
    runtime: aws.lambda.Runtime.NodeJS20dX,
    code: new pulumi.asset.AssetArchive({
        '.': new pulumi.asset.FileArchive('./server.zip')
    })
})
// create lambda url
const lambdaServerUrl = new aws.lambda.FunctionUrl("apiCvLysz210Url", {
    functionName: lambdaServer.arn,
    authorizationType: "NONE",
    cors: {
        allowCredentials: true,
        allowOrigins: ["*"],
        allowMethods: ["*"],
        allowHeaders: [
            "date",
            "keep-alive",
        ],
        exposeHeaders: [
            "keep-alive",
            "date",
        ],
        maxAge: 86400,
    }
})

// Export the name of the bucket
export const bucketName = bucket.id;
export const cvEndpoint = bucket.websiteEndpoint;
export const lambdaServerId = lambdaServer.id