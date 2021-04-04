import { API } from '../config'

export const signup = async (user) => {
    try {
        const res = await fetch(`${API}/signup`, {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
           body: JSON.stringify(user),
        })
        return res.json()
       
   } catch (error) {
       console.log(error);
   }    
}

//making request for login api
export const signin = async (user) => {
    try {
        const res = await fetch(`${API}/signin`, {
           method: "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
           },
           body: JSON.stringify(user),
        })
        return res.json()
       
   } catch (error) {
       console.log(error);
   }    
}