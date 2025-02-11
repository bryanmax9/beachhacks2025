
import { createBrowser } from "@/lib/supabase/client";

export const userIsAuthenticated = async ():Promise<boolean> => {
  const supabase = createBrowser();
  const user = supabase.auth.getUser();
  if(user==null) return false;
  return true;
}

export const userHasSubmittedForm = async ():Promise<boolean> =>  {
  const supabase = createBrowser();
  const userId = (await supabase.auth.getUser()).data.user?.id; 
  if(!userId) return false;

  console.log("uuid", userId);
  const{data, error} = await
  supabase
  .from("forms")
  .select("*")
  .eq("user_id", userId)

  if(error) console.log(error);
  console.log(data, userId);
  if(!data) return false;
  return (data.length>0);
}