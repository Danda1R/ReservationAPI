import React from 'react';
import { Platform, Button, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

const CalendarButton = ({ isResponseScreen, eventData }) => {
  const addToCalendar = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      var {reminderStatus}="granted"
      if(Platform.OS==='ios'){
        reminderStatus=Calendar.requestRemindersPermissionsAsync()
      }

      if (status === 'granted') {
        const calendarId = await findOrCreateCalendar();
        console.log('Calendar ID:', calendarId);

        if (calendarId) {
          const { title, startDate, endDate, location } = eventData;
          console.log('Event Data:', eventData);

          const eventDetails = {
            title,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            location,
          };

          console.log('Event Details:', eventDetails);

          const createdEvent = await Calendar.createEventAsync(calendarId, eventDetails);
          console.log('Event added:', createdEvent);

          const calendars = await Calendar.getCalendarsAsync();
          const calendar = calendars.find((cal) => cal.id === calendarId);
          console.log('Calendar:', calendar);
          const calendarTitle = calendar?.title || 'Unknown Calendar';

          Alert.alert(
            'Calendar Integration',
            `Event added to calendar '${calendarTitle}' (ID: ${calendarId})`
          );
        } else {
          Alert.alert('Calendar Integration', 'No Gmail calendar found.');
        }
      } else {
        Alert.alert('Calendar Integration', 'Permission to access calendar denied.');
      }
    } catch (error) {
      console.log('Error adding event to calendar:', error);
      Alert.alert('Calendar Integration', 'An error occurred while adding the event to the calendar.');
    }
  };

  const findOrCreateCalendar = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync();
      console.log('Calendar List:', calendars);

      const defaultCalendar = calendars.find((calendar) => calendar.allowsModifications);
      console.log('Default Calendar:', defaultCalendar);

      if (defaultCalendar) {
        return defaultCalendar.id;
      } else {
        console.log('No calendar found that allows modifications.');
        return null; // Return null or handle the case when no suitable calendar is found
      }
    } catch (error) {
      console.log('Error retrieving calendars:', error);
      throw error;
    }
  };

  return (
    <Button
      title={isResponseScreen ? 'Add to Calendar' : 'Create Event'}
      onPress={addToCalendar}
    />
  );
};

export default CalendarButton;