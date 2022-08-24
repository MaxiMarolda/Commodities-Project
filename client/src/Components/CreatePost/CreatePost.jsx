import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesByName, getAllCountries } from "../../Redux/Actions/Actions";
//import { postPost } from "../redux/Actions/Actions.js";  //importar acciones

export default function CreatePost() {
  const dispatch = useDispatch();
  const {allCategories} = useSelector(state => state.categories);
  const {allCountries} = useSelector(state => state.countries);

  const [errors, setErrors] = useState({})    //validaciones front
  const [checkBS, setCheckBS] = useState(0) 

  useEffect(() => {
    dispatch(getCategoriesByName()); 
    dispatch(getAllCountries()); 
  }, [dispatch]);

const [input, setInput] = useState({ //acomadar a modelo
  title:"",
  description: "",
  sell: false,
  shipping:[],
  payment:[],
  categoryName: "",
  subCategory: "",
  country:"",
  //image:"",
});

//handles
function handleChange(e){
  setInput({
    ...input,
    [e.target.name]: [e.target.value]
  })}

function handleChange2(e){
  if(e.target.checked){
    setInput({
      ...input,
      [e.target.name]: [...input.payment, e.target.value]
    })}else{
      setInput({
        ...input,
        [e.target.name]: input.payment.filter(p=> p !== e.target.value)
    })
  }}

const [idCategory, setIdCategory] = useState(0) 

function handleChange3(e){
  setInput({
    ...input,
    [e.target.name]: [e.target.value]
  })
setIdCategory(e.target.value)
}

function handleCheck(e){
  setCheckBS(1)
  if(e.target.value === "sell"){
    setInput({
      ...input,
      sell:true
    })
  } 
  if(e.target.value === "buy"){
    setInput({
      ...input,
      sell:false
    })
  }
  }

function handleSubmit(e){
  e.preventDefault();
  let val = validacion(input);
  setErrors(val)
  //dispatch(postPost(input))
  if(Object.keys(val).length >0 ){
    alert("Fix errors");
    val = {}
    return
  }
  console.log(input)
  alert("Post Created")
  setInput({
    title:"",
    description: "",
    sell: false,
    shipping:[],
    payment:[],
    categoryName: "",
    subCategory: "",
    country:"",
    //image:"",
  })
}

//validacion
function validacion(input){
  let errors = {};
  if(!input.tittle){errors.tittle="Please complete the tittle of the post"}
  if(input.description === ""){errors.description = "Complete description";}
  if(input.description.length > 255){errors.description = "the description can not have more than 255 characters";}
  if(input.shipping.length){errors.shipping = "Complete shipping";}
  if(input.payment === ""){errors.payment = "Complete payment";}
  if(input.categoryName === ""){errors.categoryName = "Complete Category";}
  if(input.subCategory === ""){errors.subCategory = "Complete Sub category";}
  if(checkBS<1){errors.sell = "Select sell or buy";}

  return errors
}

//country




  return (
<div>
  <Link to="/">
    <button className="boton" id="btna">Go Back</button>
  </Link>
  <h1>Create new post</h1>
<form onSubmit={(e)=>handleSubmit(e)}>
  <label>title: </label>
  <input type="text" value={input.title} autoComplete="off" placeholder="Please write a title..." name="title" onChange={(e)=>handleChange(e)}/><br/>
  {errors.title &&<p className="err">{errors.title}</p>}

  <select value={input.shipping} name="shipping" onChange={(e)=>handleChange(e)}>
    <option hidden value="">Shipping method</option>
    <option value={["CIF"]}>CIF</option>
    <option value={["FOB"]}>FOB</option>
    <option value={["CIF","FOB"]}>CIF or FOB</option>
  </select><br/>
  {errors.shipping &&<p className="err">{errors.shipping}</p>}

<label>Payment method:</label><br/>
<label><input type="checkbox" value="LC" onChange={(e)=>handleChange2(e)} name="payment"/> LC</label><br/>
<label><input type="checkbox" value="DLC" onChange={(e)=>handleChange2(e)} name="payment"/> DLC</label><br/>
<label><input type="checkbox" value="SBLC" onChange={(e)=>handleChange2(e)} name="payment"/> SBLC</label><br/>
  {errors.payment &&<p className="err">{errors.payment}</p>}

<select value={input.categoryName} name="categoryName" onChange={(e)=>handleChange3(e)}>
<option hidden value="">Select category</option>
{allCategories?.map((e)=>{
  return<option value={e.name}>{e.name}</option>
})}
</select><br/>
{errors.categoryName &&<p className="err">{errors.categoryName}</p>}

{idCategory === 0?<div/>:<div>
<select value={input.subCategory} name="subCategory" onChange={(e)=>handleChange(e)}> 
<option hidden value="">Select sub category</option>
  {allCategories.map((e)=>{
    if(e.name === idCategory)return e.subcategories.map((e)=>
    <option value={e}>{e}</option>
    )
    })}
  </select><br/>
  {errors.subCategory &&<p className="err">{errors.subCategory}</p>}
</div>}

  <label>Description: </label>
  <textarea value={input.description} autoComplete="off" placeholder="Please write a description..." name="description" onChange={(e)=>handleChange(e)}/><br/>
  {errors.description &&<p className="err">{errors.description}</p>}

  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="buy" />Buy</label>
  <label><input onChange={(e)=>handleCheck(e)}  type="radio" name="check" value="sell"/>sell</label><br/>
  {errors.sell &&<p className="err">{errors.sell}</p>}

  <select value={input.country} name="country" onChange={(e)=>handleChange(e)}>
        <option hidden value="">Select country...</option>
          {allCountries.map((c)=>(
            <option value={c.name.common}>{c.name.common}</option>
          ))}
        </select><br/>


  <button type="submit" className="boton">Create Post</button>
</form>
</div>
  )}







