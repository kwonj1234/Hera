import { useState } from "react"

import { StyleSheet, View } from "react-native"
import { Stack } from "expo-router"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { CategoryToggle, DocumentUploader } from "@/components"
import { TextInput, Button, FAB } from "react-native-paper"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { DocumentPickerAsset } from "expo-document-picker"

import { router } from 'expo-router'
import { insertLabDocuments, uploadLabDocuments } from "@/api/labDocuments"
import { insertLab } from "@/api/labs"
import { useAuth } from "@/providers"

export default function UploadScreen() {
  const [labName, setLabName] = useState<string>("")
  const [labType, setLabType] = useState<string>("")
  const [category, setCategory] = useState<"physical" | "dental" | "vision">("physical")
  const [isDateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [labDate, setLabDate] = useState<Date | undefined>(new Date());
  const [result, setResult] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<DocumentPickerAsset[]>([])
  const { user } = useAuth()

  const currentDate = new Date()
  const header = {
		title: "Upload Document",
	}
	
  const isFormFilledOut = labName.length && labType.length && !!labDate && result.length

  const onLabDateConfirm = (event: DateTimePickerEvent, date: Date | undefined) => {
    setLabDate(date)
    setDateModalOpen(false)
  }

  const uploadTest = async () => {
    setLoading(true)

    if (!isFormFilledOut || !user) {
      return;
    }

    const lab = await insertLab(
      user?.id,
      user?.id,
      category,
      result,
      notes,
      labType,
      labDate,
    )
    console.log('labl',lab)

    if (!lab) {
      return
    }

    const documents = await uploadLabDocuments(user?.id, lab.id, files)
    await insertLabDocuments(lab.id, documents)

    setLoading(false)
    router.back()
  }

  const uploadFiles = (files: DocumentPickerAsset[]) => {
    console.log(files)
    setFiles(files)
  }

  const removeFile = (uri: string) => {
    let temp = [...files]
    const i = temp.findIndex(file => file.uri === uri)
    console.log(i)
    if (i !== -1) {
      temp.splice(i, 1);
    }
    setFiles(temp)
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
            value={labType}
            onChangeText={text => setLabType(text)}
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
            onRemove={removeFile}
            mode="text"
            files={files}
          >
            Choose File
          </DocumentUploader>

          <FAB
            label={loading ? "Uploading Test..." : "Upload Test"}
            // disabled={!isFormFilledOut || loading}
            uppercase
            onPress={() => uploadTest()}
            style={styles.FAB}
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
  },

  FAB: {
    marginTop: 20,
    marginBottom: 20
  }
})