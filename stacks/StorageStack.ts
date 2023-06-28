import {Table, Bucket, StackContext} from 'sst/constructs';
interface IStacks {
  table: Table;
  bucket: Bucket;
}
export function StorageStack({stack}: StackContext): IStacks {
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
