import {StorageStack} from './StorageStack';
import {ApiStack} from './ApiStack';
import {Cognito, use} from 'sst/constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export function AuthStack({stack, app}: {stack: any; app: any}) {
  const {bucket} = use(StorageStack);
  const {api} = use(ApiStack);

  //create a cognito user pool and identity pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email']
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // allow access to api
    api,
    // policy to allow access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ['s3:*'],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*'
      ]
    })
  ]);

  // show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId
  });

  // return the auth resources
  return {
    auth
  };
}
