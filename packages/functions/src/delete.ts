import dynamodb from '@my-sst-app/core/dynamodb';
import handler from '@my-sst-app/core/handler';
import {Table} from 'sst/node/table';

export const main = handler(async (event: any) => {
  const params = {
    TableName: Table.Notes.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      noteId: event.pathParameters.id // The id of the note from the path
    }
  };
  await dynamodb.delete(params);

  return {status: true};
});
