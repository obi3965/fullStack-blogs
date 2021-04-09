import { API } from '../config'


export const getCategories = async () => {
    try {
        const res = await fetch(`${API}/categories`, {
            method:"GET"
        })
        return res.json()

    } catch (error) {
        console.log(error);
    }
}

export const category = async slug => {
    try {
        const res = await fetch(`${API}/category/${slug}`, {
            method:"GET"
        })
        console.log(res)
        return res.json()

    } catch (error) {
        console.log(error);
    }
}


export const getAllBlogs = async (sortBy) => {
    try {
     const data = await fetch(`${API}/blogs/all?sortBy=${sortBy}&order=desc&limit=4`, {
         method:'GET'
     })
   
     return data.json()   
    } catch (error) {
        console.log(error)
    }

    
}