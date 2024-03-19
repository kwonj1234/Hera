import { useState } from "react"

import { StyleSheet, View } from "react-native"
import { Stack } from "expo-router"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { CategoryToggle, DocumentUploader } from "@/components"
import { TextInput, Button, FAB } from "react-native-paper"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { DocumentPickerAsset } from "expo-document-picker"

export default function UploadScreen() {
  const [labName, setLabName] = useState<string>("")
  const [labTest, setLabTest] = useState<string>("")
  const [category, setCategory] = useState<"physical" | "dental" | "vision">("physical")
  const [isDateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [labDate, setLabDate] = useState<Date | undefined>(new Date());
  const [result, setResult] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<DocumentPickerAsset[] | undefined>(undefined)

  const currentDate = new Date()
  const header = {
		title: "Upload Document",
	}
	
  const isFormFilledOut = !!labName && !!labTest && !!labDate && !!result

  const onLabDateConfirm = (event: DateTimePickerEvent, date: Date | undefined) => {
    setLabDate(date)
    setDateModalOpen(false)
  }

  const uploadTest = async () => {
    setLoading(true)
    setLoading(false)
  }

  const uploadFiles = (files: DocumentPickerAsset[]) => {
    console.log(files)
    setFiles(files)
  }

	return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Stack.Screen options={header} />
          <TextInput
            value={labName}
            onChangeText={text => setLabName(text)}
            mode="outlined"
            placeholder="Name"
            style={styles.input}
          ></TextInput>

          <CategoryToggle
            value={category}
            onValueChange={setCategory}
            type='row'
          ></CategoryToggle>
          
          <TextInput
            value={labTest}
            onChangeText={text => setLabTest(text)}
            mode="outlined"
            placeholder="Test Type"
            style={styles.input}
          ></TextInput>

          <TextInput
            value={result}
            onChangeText={text => setResult(text)}
            mode="outlined"
            placeholder="Result"
            style={styles.input}
          ></TextInput>

          <Button onPress={() => setDateModalOpen(true)}>
            Set Lab Date: {labDate 
              ? labDate.toDateString() 
              : currentDate.toDateString()}
          </Button>

          {isDateModalOpen && (
            <DateTimePicker
              testID="test"
              value={labDate ?? new Date()}
              mode="date"
              onChange={onLabDateConfirm}
            ></DateTimePicker>
          )}
          <TextInput
            value={notes}
            multiline={true}
            onChangeText={text => setNotes(text)}
            mode="outlined"
            placeholder="Notes"
            style={styles.input}
          ></TextInput>

          <DocumentUploader
            onResponse={uploadFiles}
            mode="text"
          >
            Choose File
          </DocumentUploader>

          <FAB
            label={loading ? "Uploading Test..." : "Upload Test"}
            disabled={!!isFormFilledOut || loading}
            uppercase
            onPress={() => uploadTest()}
          ></FAB>
        </View>
      </KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
    alignItems:'center',
		padding: 10
	},

	input: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
		marginBottom: 20,
    width: '90%'
	},

	label: {
		color: 'gray',
		fontSize: 16
	},

  "date-picker": {
    height: 30
  }
})