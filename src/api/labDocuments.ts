import { supabase } from "@/lib/supabase";
import { LabDocument } from "@/types"; 
import * as FileSystem from 'expo-file-system'
import { decode } from 'base64-arraybuffer';

const tableName = 'lab_documents'
const bucket = 'lab-documents'

export const uploadLabDocuments = async (userUID:string, labId:number, documents: Array<any>) => {

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
          `${userUID}/${labId}/${doc.name}`, 
          decode(base64), 
          { contentType: doc.mimeType }
        );
  
      if (data) {
        doc['path'] = data.path
        return doc;
      }
    }
  }))

  return documents
}

export const insertLabDocuments = async (lab_id: number, documents: Array<any>) => {
  const docs = await Promise.all(documents.map(async (doc) => {
    const {data, error} = await supabase.from(tableName)
      .insert({
        lab_id,
        path: doc.path,
        description: "",
        file_name: doc.name
      }).select()
    if (!error) {
      return data
    } else {
      return error
    }
  }))

  return docs
}