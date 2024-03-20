import { supabase } from "@/lib/supabase";
import { Lab } from "@/types"; 

const tableName = 'labs'

export const uploadLab = async (
  uploadedBy: string,
  patient: string,
  category: string,
  result: string,
  description: string,
  labType: string,
  labDate: Date,
) => {
  const {data, error} = await supabase.from(tableName)
    .insert({
      patient,
      category,
      result,
      description,
      uploaded_by: uploadedBy,
      lab_type: labType,
      lab_date: labDate
    })
  console.log(data)
  if (!error) return data
}

export const insertUser = async (first_name: string, last_name: string, id: string, primary_caregiver=true) => {
  const { data, error } = await supabase.from(tableName)
    .insert({
      id,
      first_name,
      last_name,
      primary_caregiver
    })
}