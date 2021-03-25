const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-2'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'recipe-list';
const recipePath = '/recipe';
const recipesPath = '/recipes';

exports.handler = async function(event) {
  console.log('Request event: ', event);
  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === recipesPath:
      response = await getRecipes();
      break;
    case event.httpMethod === 'GET' && event.path === recipePath:
      response = await getRecipe(event.queryStringParameters.itemId);
      break;
    case event.httpMethod === 'POST' && event.path === recipePath:
      response = await saveRecipe(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === recipePath:
      const requestBody = JSON.parse(event.body);
      response = await modifyRecipe(requestBody.itemId, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'DELETE' && event.path === recipePath:
      response = await deleteRecipe(JSON.parse(event.body).itemId);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
}

async function getRecipe(itemId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'itemId': itemId
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Error error...', error);
  });
}

async function getRecipes() {
  const params = {
    TableName: dynamodbTableName
  }
  const allItems = await scanDynamoRecords(params, []);
  const body = {
    items: allItems
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Error error...', error);
  }
}

async function saveRecipe(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error error...', error);
  })
}

async function modifyRecipe(itemId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'itemId': itemId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error error...', error);
  })
}

async function deleteRecipe(itemId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'itemId': itemId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Error error...', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}