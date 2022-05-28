import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { filterPokeByTypes } from "../../redux/actions";



export default function Types(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)

 function handleFilterByTypes(e){
    dispatch(filterPokeByTypes(e.target.value))
 }

   return(
       <select onChange={e => handleFilterByTypes(e)}>
           {<option value="type">Type</option>}
          
           {
               
           types?.map(e => {
               return(

                   <option value={e.name} key={e.id}>{e.name}</option>
               )
           })

           }
       </select>
   )
}