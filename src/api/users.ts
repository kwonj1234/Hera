import { supabase } from "@/lib/supabase";
import { User } from "@/types"; 

const tableName = 'users'

export const getUser = async (id: String) => {
  const {data, error} = await supabase.from(tableName).select('*').eq('user_uid', id)

  if (!error && data) return new User({...data[0]})
}