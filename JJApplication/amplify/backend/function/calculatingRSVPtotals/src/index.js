const AWS = require('aws-sdk/global');
require('aws-sdk/clients/dynamodb');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { eventId } = event; // Assuming the event ID is passed as input to the Lambda function

    // Query the Rsvp table to count the number of true statuses for the given event
    const queryParams = {
        TableName: 'Rsvp',
        IndexName: 'byEvent',
        KeyConditionExpression: 'eventid = :eventId',
        ExpressionAttributeValues: {
            ':eventId': eventId,
            ':statusValue': 1, // Set statusValue to 1 for counting only entries with status = 1
        },
        FilterExpression: '#status = :statusValue', // Use expression attribute name for 'status'
        ExpressionAttributeNames: {              // Define expression attribute name for 'status'
            '#status': 'status',
        },
        Select: 'COUNT',
    };

    try {
        const result = await ddb.query(queryParams).promise();
        const rsvpCount = result.Count;

        // Update the rsvp_total attribute in the Event table
        const updateParams = {
            TableName: 'Event',
            Key: { eventid: eventId },
            UpdateExpression: 'SET rsvp_total = :rsvpCount',
            ExpressionAttributeValues: {
                ':rsvpCount': rsvpCount,
            },
        };

        await ddb.update(updateParams).promise();

        return {
            statusCode: 200,
            body: `RSVP count for event ${eventId}: ${rsvpCount}`,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`,
        };
    }
    exports.handler = event => {
        console.log(`EVENT: ${JSON.stringify(event)}`);
        for (const record of event.Records) {
            console.log(record.eventID);
            console.log(record.eventName);
            console.log('DynamoDB Record: %j', record.dynamodb);
        }
        return Promise.resolve('Successfully processed DynamoDB record');
    };

};


