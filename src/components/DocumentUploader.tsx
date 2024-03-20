import { PropsWithChildren, useCallback, useEffect } from "react";
import * as DocumentPicker from 'expo-document-picker';

import { StyleSheet, Text, View } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";

interface props extends PropsWithChildren {
  onResponse: Function,
  onRemove: Function,
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal' | undefined,
  icon?: string | undefined,
  files: DocumentPicker.DocumentPickerAsset[]
}

export default function DocumentUploader({children, icon=undefined, mode, onResponse, onRemove, files} :props) {

  useEffect(() => {
    console.log(files)
  }, [files])

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // All files
        multiple: true
      });

      if (result.canceled === false) {
        // File picked successfully
        onResponse(result.assets);
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
      <Card style={styles.container}>
        <Button
            mode={mode}
            icon={icon}
            onPress={() => handlePickDocument()}
        >
            {children}
        </Button>

        {
          files.map((file) => {
            return (
              <View key={file.uri} style={styles.row}>
                <Text>
                  {file.name}
                </Text>
                <IconButton
                  size={15}
                  icon='window-close'
                  onPress={() => onRemove(file.uri)}
                ></IconButton>
              </View>

            )      
          })
        }
      </Card>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems:'center',
    width: '90%'
	},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})