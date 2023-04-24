import axios from 'axios'
import {API} from '../api'

export const deleteRequest = async(id)=>{
return await axios.delete(API+"/"+ id)
}