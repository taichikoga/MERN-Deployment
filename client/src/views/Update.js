import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default props => {

    const { id } = props;

    const [ name, setName ] = useState(""); 
    const [ type, setType ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ skill_1, setSkill_1 ] = useState("");
    const [ skill_2, setSkill_2 ] = useState("");
    const [ skill_3, setSkill_3 ] = useState("");

    const [ errors, setErrors ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill_1(res.data.skill_1);
                setSkill_2(res.data.skill_2);
                setSkill_3(res.data.skill_3);
            })
    }, [])

    const updatePet = e => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/pets/' + id, {
            name,
            type,
            description,
            skill_1,
            skill_2,
            skill_3
        })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
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
            <h3>Edit { name }</h3>
            <Link to="/">back to home</Link>
            <form onSubmit={ updatePet }>
                {errors.map((err, index) => <p key={ index}>{err}</p>)}
                <p>
                    <label>Name</label><br/>
                    <input
                        type="text"
                        name="name"
                        value={ name }
                        onChange = {(e)=>setName(e.target.value)}
                    />
                </p>
                <p>
                    <label>Type</label><br/>
                    <input
                        type="text"
                        name="type"
                        value={ type }
                        onChange = {(e)=>setType(e.target.value)}
                    />
                </p>
                <p>
                    <label>Description</label><br/>
                    <input
                        type="text"
                        name="description"
                        value={ description }
                        onChange = {(e)=>setDescription(e.target.value)}
                    />
                </p>
                <p>
                    <label>Skill 1</label><br/>
                    <input
                        type="text"
                        name="skill_1"
                        value={ skill_1 }
                        onChange = {(e)=>setSkill_1(e.target.value)}
                    />
                </p>
                <p>
                    <label>Skill 2</label><br/>
                    <input
                        type="text"
                        name="skill_2"
                        value={ skill_2 }
                        onChange = {(e)=>setSkill_2(e.target.value)}
                    />
                </p>
                <p>
                    <label>Skill 3</label><br/>
                    <input
                        type="text"
                        name="skill_3"
                        value={ skill_3 }
                        onChange = {(e)=>setSkill_3(e.target.value)}
                    />
                </p>
                <input type="submit" value="Update Pet" />
            </form>
        </div>
    )
}
