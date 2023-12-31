import {Table} from 'sst/node/table';
import * as uuid from 'uuid';
import handler from '../../core/src/handler';
import dynamodb from '@my-sst-app/core/dynamodb';

export const main = handler(async (event: any) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now() // Current Unix timestamp
    }
  };

  await dynamodb.put(params);

  return params.Item;
});
