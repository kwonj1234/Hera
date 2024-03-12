import { PropsWithChildren, useCallback } from "react";
import * as DocumentPicker from 'expo-document-picker';

import { Button } from "react-native-paper";

interface props extends PropsWithChildren {
    onResponse: Function,
    mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined,
    icon?: string | undefined
}

export default function DocumentUploader({children, icon=undefined, mode, onResponse} :props) {
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // All files
        multiple: true
      });

      if (result.canceled === false) {
        // File picked successfully
        console.log('Document picked:', result);
        // Handle the selected file here
      } else {
        // User cancelled the picker
        console.log('User cancelled document picker');
      }
    } catch (error) {
      // An error occurred
      console.error('Error picking document:', error);
    }
  };


    return (
        <Button
            mode={mode}
            icon={icon}
            onPress={() => handlePickDocument()}
        >
            {children}
        </Button>
    )
}