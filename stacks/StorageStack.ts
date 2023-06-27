import {Table, Stack, Bucket} from 'sst/constructs';
import {App, StackProps} from 'aws-cdk-lib';

interface StorageStackProps {
  stack: Stack;
  app: App;
}

export function StorageStack({stack, app}: StorageStackProps): {
  table: Table;
  bucket: Bucket;
} {
  const bucket = new Bucket(stack, 'Uploads');
  const table = new Table(stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string'
    },
    primaryIndex: {partitionKey: 'userId', sortKey: 'noteId'}
  });

  return {
    table,
    bucket
  };
}
