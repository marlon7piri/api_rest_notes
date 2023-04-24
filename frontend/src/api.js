
export const API = "http://localhost:3000/api/notes"

const getNotes =()=>{

const res = fetch(API).then(response=>response.json())
return res

}

export default getNotes;