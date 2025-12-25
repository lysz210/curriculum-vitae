import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { glob } from 'glob';
import mime from 'mime';
import * as AdmZip from 'adm-zip'

const configs = new pulumi.Config();
const PublicRead = aws.s3.CannedAcl.PublicRead;

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("cv.lysz210.name", {
    bucket: 'cv.lysz210.name'
});

const bucketAcl = new aws.s3.BucketAcl("cv.lysz210.name-bucketAcl", {
    bucket: bucket.id,
    acl: PublicRead
});

const corsConfiguration = new aws.s3.BucketCorsConfiguration("cv.lysz210.name-corsConfiguration", {
    bucket: bucket.id,
    corsRules: [
        {
            allowedMethods: ['GET'],
            allowedOrigins: ['*']
        }
    ]
});

const websiteConfiguration = new aws.s3.BucketWebsiteConfiguration("cv.lysz210.name-websiteConfiguration", {
    bucket: bucket.id,    
    indexDocument: {suffix: "index.html"},
        routingRules: [
            {
                condition: {
                    httpErrorCodeReturnedEquals: '404'
                },
                redirect: {
                    replaceKeyWith: 'en'
                }
            }
        ]
    }
)

// load all files
const dist = '../.output/public/';

glob.sync('**/*', {
    cwd: dist,
    nodir: true,
    stat: true
}).forEach(file => {
    const filePath = `${dist}${file}`;
    const mimeType = mime.getType(filePath);
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
    runtime: "nodejs24.x",
    code: new pulumi.asset.AssetArchive({
        '.': new pulumi.asset.FileArchive('./server.zip')
    }),
    timeout: 30
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
    },
})

// Export the name of the bucket
export const bucketName = bucket.id;
export const cvEndpoint = websiteConfiguration.websiteEndpoint;
export const lambdaServerId = lambdaServer.id