import React, { useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default () => {

    //keep track of what is being typed via useState hook
    const [ name, setName ] = useState(""); 
    const [ type, setType ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ skill_1, setSkill_1 ] = useState("");
    const [ skill_2, setSkill_2 ] = useState("");
    const [ skill_3, setSkill_3 ] = useState("");

    const [ errors, setErrors ] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pets', {
            name,
            type,
            description,
            skill_1,
            skill_2,
            skill_3
        })
            .then(res=> {
                console.log(res);
                navigate("/");
            })
            .catch(err=> {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    console.log(errorResponse[key].properties.message);
                    errorArr.push(errorResponse[key].properties.message);
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h3>Know a pet needing a home?</h3>
            <Link to="/">back to home</Link>
            <form onSubmit={ onSubmitHandler }>
                {errors.map((err, index) => <p key={ index}>{err}</p>)}
                <p>
                    <label>Name</label><br/>
                    <input type="text" onChange = {(e)=>setName(e.target.value)}/>
                </p>
                <p>
                    <label>Type</label><br/>
                    <input type="text" onChange = {(e)=>setType(e.target.value)}/>
                </p>
                <p>
                    <label>Description</label><br/>
                    <input type="text" onChange = {(e)=>setDescription(e.target.value)}/>
                </p>
                <p>
                    <label>Skill 1</label><br/>
                    <input type="text" onChange = {(e)=>setSkill_1(e.target.value)}/>
                </p>
                <p>
                    <label>Skill 2</label><br/>
                    <input type="text" onChange = {(e)=>setSkill_2(e.target.value)}/>
                </p>
                <p>
                    <label>Skill 3</label><br/>
                    <input type="text" onChange = {(e)=>setSkill_3(e.target.value)}/>
                </p>
                <input type="submit" value="Add Pet" />
            </form>
        </div>
    )
}
