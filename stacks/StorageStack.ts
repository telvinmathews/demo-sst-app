import {Table, Bucket, StackContext} from 'sst/constructs';
interface IStacks {
  table: Table;
  bucket: Bucket;
}
export function StorageStack({stack}: StackContext): IStacks {
  const bucket = new Bucket(stack, 'Uploads', {
    cors: [
      {
        maxAge: '1 day',
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD']
      }
    ]
  });
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
