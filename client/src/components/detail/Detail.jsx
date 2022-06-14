import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { cleanDetail, getPokeById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/q2.gif";
import styles from "../detail/Detail.module.css"
import Loading from "../loading/Loading";
// import ih from "../../assets/Badges/badge_bug.png"




export default function PokemonDetail(){
    const dispatch = useDispatch();
    const {id} = useParams()

 useEffect(() => {
    dispatch(getPokeById(id));
    return ()=>{
        dispatch(cleanDetail())
    }
 },[dispatch, id])

 const pokeDetail = useSelector(state => state.detail)

// const typesMap =  pokeDetail[0]?.types.map(e => require(`../../assets/Badges/badge_${e.name}.png`))
//  console.log(typesMap)


 var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div className={styles.detailFirstContainer}>
            {
                pokeDetail.length > 0?
                <div className={styles.detailContainer}>
                    <div className={styles.detailImgContainer}>
                        <img className={styles.detailImg} src={regexUrl.test(pokeDetail[0].image)?pokeDetail[0].image: img} alt="pokemon_img"  />
                    </div>
                    <div className={styles.detailStatsContainer}>
                        <h1 className={styles.detailName}>{pokeDetail[0].name}</h1>
                        <h3 className={styles.detailId}>ID: {pokeDetail[0].id}</h3>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Life:</h4></div>
                            <h4 className={styles.detailLife}>{pokeDetail[0].life}</h4>
                        </div>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Defense:</h4></div>
                            <h4 className={styles.detailDefense}>{pokeDetail[0].defense}</h4>
                        </div>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Attack:</h4></div>
                            <h4 className={styles.detailAttack}>{pokeDetail[0].attack}</h4>
                        </div>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Speed:</h4></div>
                            <h4 className={styles.detailSpeed}>{pokeDetail[0].speed}</h4>
                        </div>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Height:</h4></div>
                            <h4 className={styles.detailWH}>{pokeDetail[0].height}</h4>
                        </div>

                        <div className={styles.detailSetDisplay}>
                            <div><h4>Weight:</h4></div>
                            <h4 className={styles.detailWH}>{pokeDetail[0].weight}</h4>
                        </div>

                        <div className={styles.detailTypeContainer}>
                            <div><h3 className={styles.type}>Type</h3></div>
                            <h4 className={styles.detailTypeH4}>{pokeDetail[0].types?.map(e =><div key={e.name}>{e.name}</div> )}</h4>
                          
                        </div>
                    </div>
                </div>
                : <div>
                    <Loading/>
                    <h4>Loading...</h4>
                  </div>
            }

            <Link to="/home">
                <button className={styles.detailBtn}>Back</button>
            </Link>
        </div>
    )

}