import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screen components
import UploadScreen from './upload';
import ProfileScreen from './dashboard';

const Drawer = createDrawerNavigator();

export default function Profile() {
  return (
      <Drawer.Navigator
        defaultStatus='open'
      >
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Upload" component={UploadScreen} />
      </Drawer.Navigator>
  );
}