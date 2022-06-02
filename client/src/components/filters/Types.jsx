import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { filterPokeByTypes } from "../../redux/actions";
import styles from "../filters/Types.module.css"


export default function Types({setCurrentPage}){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)

 function handleFilterByTypes(e){
    dispatch(filterPokeByTypes(e.target.value))
    setCurrentPage(1)
 }

   return(
       <select className={styles.typesSelect} onChange={e => handleFilterByTypes(e)}>
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