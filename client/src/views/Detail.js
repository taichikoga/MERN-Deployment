import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';

export default props => {

    const [pet, setPet] = useState({});
    const [pets, setPets] = useState([]);

    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id != petId));
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + props.id)
            .then(res => setPet(res.data))
    }, [])

    const deletePet = petId => {
        axios.delete('http://localhost:8000/api/pets/' + petId)
            .then(res => {
                removeFromDom(petId);
                navigate("/");
            })
    }

    return (
        <div>
            <h3>Details about: { pet.name }</h3>
            <button onClick={ (e) => { deletePet(pet._id) }}>Adopt Pet</button>
            <Link to="/">back to home</Link>
            <p>Pet Type: { pet.type }</p>
            <p>Description: { pet.description }</p>
            <p>Skills:
                <ul>
                    <li>{ pet.skill_1 }</li>
                    <li>{ pet.skill_2 }</li>
                    <li>{ pet.skill_3 }</li>
                </ul>
            </p>
        </div>
    )
}
