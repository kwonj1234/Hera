import { supabase } from "@/lib/supabase";
import { User } from "@/types"; 

const tableName = 'users'

export const getUser = async (id: String) => {
  const {data, error} = await supabase.from(tableName).select('*').eq('user_uid', id)

  if (!error && data) return new User({...data[0]})
}

export const insertUser = async (first_name: string, last_name: string, id: string, primary_caregiver=true) => {
  console.log(first_name, last_name, id)
  const { data, error } = await supabase.from(tableName)
    .insert({
      id,
      first_name,
      last_name,
      primary_caregiver
    })

    console.log(data, error)
}