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