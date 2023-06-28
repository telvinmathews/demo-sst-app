import {Table} from 'sst/node/table';
import handler from '../../core/handler';
import dynamodb from '../../core/dynamodb';

export const main = handler(async (event: any) => {
  const params = {
    TableName: Table.Notes.tableName,
    key: {
      userId: '123',
      noteId: event.pathParameters.id
    }
  };
  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }
  return result.Item;
});
