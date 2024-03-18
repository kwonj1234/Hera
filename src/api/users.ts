import { supabase } from "@/lib/supabase";
import { UserType } from "@/types"; 

const tableName = 'users'

class User {
  id: String
  firstName: String
  lastName: String
  primary: Boolean

  constructor({user_uid, first_name, last_name, primary_caregiver} : UserType) {
    this.id = user_uid
    this.firstName = first_name
    this.lastName = last_name
    this.primary = primary_caregiver
  }
}

export const getUser = async (id: String) => {
  const {data, error} = await supabase.from(tableName).select('*').eq('user_uid', id)
  
  if (!error && data) return new User({...data[0]})
}