import {Api, use, Stack, StackContext} from 'sst/constructs';
import {StorageStack} from './StorageStack';
import {App} from 'aws-cdk-lib';

export function ApiStack({stack, app}: StackContext) {
  const {table} = use(StorageStack);

  // Create the API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [table]
      }
    },
    routes: {
      'POST /notes': 'packages/functions/src/create.main',
      'GET /notes/{id}': 'packages/functions/src/get.main'
    }
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url
  });

  // Return the API resource
  return {
    api
  };
}