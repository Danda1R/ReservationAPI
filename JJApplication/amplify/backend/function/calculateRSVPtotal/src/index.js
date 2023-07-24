const AWS = require('aws-sdk');
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
        },
        FilterExpression: 'status = :statusValue',
        ExpressionAttributeValues: {
            ':statusValue': true,
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
};

