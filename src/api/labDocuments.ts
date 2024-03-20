import { supabase } from "@/lib/supabase";
import { LabDocument } from "@/types"; 
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer';

const tableName = 'lab_documents'
const bucket = 'lab-documents'

export const uploadLabDocuments = async (userUID:string, labName:string, documents: Array<any>) => {

  documents = await Promise.all(documents.map(async (doc) => {
    if (!doc?.uri.startsWith('file://')) {
      return;
    } else {
      const base64 = await FileSystem.readAsStringAsync(doc.uri, {
        encoding: 'base64',
      });
  
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(
          `${userUID}/${labName}/${doc.name}`, 
          decode(base64), 
          { contentType: doc.mimeType }
        );
  
      console.log(error);
  
      if (data) {
        doc['path'] = data.path
        return doc;
      }
    }
  }))

  return documents
}
