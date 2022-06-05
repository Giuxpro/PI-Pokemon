import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemos } from "../../redux/actions";
import styles from "../form/PokemonCreate.module.css";

export default function CreatePokemon() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const pokes = useSelector((state) => state.pokemons);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPokemos());
  }, [dispatch]);

  function validation(input) {
    let regexNum = /^[1-9]$|^[1-9][0-9]$|^(100)$/; // regex for number only between 1 to 600
    let RegexName = new RegExp(/^\b[A-Za-z\s]+$/g);
    // let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
    // let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/; //regex letters and numbers without especial chart
    const error = {};

    if (!input.name) {
      error.name = "Enter Pokemon name";
    }
    if (!RegexName.test(input.name)) {
      error.name = "Enter a valid Pokemon Name";
    }
    if (!regexNum.test(input.life)) {
      error.life = "Pokemon must have Life points";
    }
    if (!regexNum.test(input.attack)) {
      error.attack = "Pokemon must have attack points";
    }
    if (!regexNum.test(input.defense)) {
      error.defense = "Pokemon must have defense points";
    }
    if (!regexNum.test(input.speed)) {
      error.speed = "Pokemon must have speed points";
    }
    if (!regexNum.test(input.height)) {
      error.height = "Pokemon must have height points";
    }
    if (!regexNum.test(input.weight)) {
      error.weight = "Pokemon must have weight points";
    }
    if (input.types.length <= 0 || input.types.length > 2) {
      error.types = "Enter a Type Pokemon";
    }

    return error;
  }

// ############### RANDOM VALUES ################### //

     var random = Math.floor(Math.random() * 39 + 1)// using to generate a random image
     var random1 = Math.floor(Math.random() * 39 + 1)// using to generate a random image
     var img = pokes.map(e => e.image)
 
// ################################## //

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...new Set([...input.types, e.target.value])],
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== e),
    });
  }

  // let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
  let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
  let regexNum = /^[1-9]$|^[1-9][0-9]$|^(100)$/; // regex for number only between 1 to 600
  let RegexName = new RegExp(/^\b[A-Za-z\s]+$/g);
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    if (!input.name) {
      return alert("Enter Pokemon name");
    } else if (!RegexName.test(input.name)) {
      return alert("The name must only have letters");
    } else if (!regexNum.test(input.life)) {
      return alert("Enter a Hp points ");
    } else if (!regexNum.test(input.attack)) {
      return alert("Pokemon must have attack points");
    } else if (!regexNum.test(input.defense)) {
      return alert("Pokemon must have defense points");
    } else if (!regexNum.test(input.speed)) {
      return alert("Pokemon must have speed points");
    } else if (!regexNum.test(input.height)) {
      return alert("Pokemon must have height points");
    } else if (!regexNum.test(input.weight)) {
      return alert("Pokemon must have weight points");
    } else if (input.types.length <= 0 || input.types.length > 2) {
      return alert("Enter a Type Pokemon");
    }

    dispatch(postPokemon(input));
    alert("Pokemon Created!!");
    setInput({
      name: "",
      image: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    navigate("/home");
  }

  return (
    <div className={styles.createContainer}>
      <h1 className={styles.createTitle}>Create a new Pokemon!</h1>

      <div className={styles.createFormContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.createGroupsContainer}>
            <div className={styles.createGroupCont1}>
              <div>
                <label></label>
                <input
                className={styles.createInput}
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name || !expReg.test(errors.name) ? (
                  <h4 className={styles.msjError}>{errors.name}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.weight}
                  name="weight"
                  placeholder="Weight"
                  onChange={(e) => handleChange(e)}
                />
                {errors.weight || !expReg.test(errors.weight) ? (
                  <h4 className={styles.msjError}>{errors.weight}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.height}
                  name="height"
                  placeholder="Height"
                  onChange={(e) => handleChange(e)}
                />
                {errors.height || !expReg.test(errors.height) ? (
                  <h4 className={styles.msjError}>{errors.height}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.image}
                  name="image"
                  placeholder="http://image.jpg"
                  onChange={(e) => handleChange(e)}
                />
                {/* {!input.image || !expReg.test(input.image)? <h4 >{"Enter a Valid Name"}</h4>: false} */}
              </div>
              {/* ############################## */}
            <div>
                
                {
                    <img className={styles.createImg} src={img[random]} alt="randomIMG" />
                }
            </div>
            </div>
            {/* ############################## */}
            <div className={styles.createGroupCont2}>
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.life}
                  name="life"
                  placeholder="Heal Points"
                  onChange={(e) => handleChange(e)}
                />
                {errors.life || !expReg.test(errors.life) ? (
                  <h4 className={styles.msjError}>{errors.life}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.attack}
                  name="attack"
                  placeholder="Attack Points"
                  onChange={(e) => handleChange(e)}
                />
                {errors.attack || !expReg.test(errors.attack) ? (
                  <h4 className={styles.msjError}>{errors.attack}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.defense}
                  name="defense"
                  placeholder="Defense Points"
                  onChange={(e) => handleChange(e)}
                />
                {errors.defense || !expReg.test(errors.defense) ? (
                  <h4 className={styles.msjError}>{errors.defense}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                <label></label>
                <input
                 className={styles.createInput}
                  type="text"
                  value={input.speed}
                  name="speed"
                  placeholder="Speed Points"
                  onChange={(e) => handleChange(e)}
                />
                {errors.speed || !expReg.test(errors.speed) ? (
                  <h4 className={styles.msjError}>{errors.speed}</h4>
                ) : (
                  false
                )}
              </div>
              {/* ############################## */}
              <div>
                
                {
                    <img className={styles.createImg} src={img[random1]} alt="randomIMG" />
                }
            </div>
            </div>
          
          {/* ############################## */}
          <div>
            <div className={styles.createSelectTypes}>
              <select className={styles.createSelectOpt} onChange={(e) => handleSelect(e)}>
                {types?.map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
              {/* <ul><li>{input.types.map(e => e +" ,")}</li></ul> */}
            </div>
          </div>
          </div>
           
            {/* ############################## */}
          <div>
            <Link to="/home">
              <button className={styles.createBtnform}>Back</button>
            </Link>
            <button className={styles.createBtnform} type="submit">Create Pokemon</button>
          </div>
        </form>
      </div>
      <div className={styles.createDeleteTypes}>
        {input.types.map((e) => (
          <div key={e}>
            <button className={styles.createBtnTypes} onClick={() => handleDelete(e)}>{e}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
