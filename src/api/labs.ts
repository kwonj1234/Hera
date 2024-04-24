import { supabase } from "@/lib/supabase";
import { Lab } from "@/types"; 

const tableName = 'labs'

export const insertLab = async (
  uploadedBy: string,
  patient: string,
  category: string,
  result: string,
  notes: string,
  labType: string,
  labDate: Date,
) => {
  const {data, error} = await supabase.from(tableName)
    .insert({
      patient,
      category,
      result,
      notes,
      uploaded_by: uploadedBy,
      lab_type: labType,
      lab_date: labDate
    })
    .select()

  if (!error) return data[0]
}

export const getLabs = async (
  patient: string,
  category: string | null
) => {
  let resp
  if (category === null) {
    resp = await supabase.from(tableName)
      .select()
      .eq('patient', patient)
  } else {
    resp = await supabase.from(tableName)
      .select()
      .eq('patient', patient)
      .eq('category', category)
  }

  const data = resp.data
  const error = resp.error

  if (!error && data) return data[0]
}