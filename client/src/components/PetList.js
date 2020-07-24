import React from 'react'
import axios from 'axios';
import { Link } from '@reach/router';

export default props => {

    return (
        <div>
            <h3>These pets are looking for a good home</h3>
            <Link to="/pets/new">add a pet to the shelter</Link>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                {props.pets.map((pet, idx)=>{
                return <tr key={idx}>
                    <td>{pet.name}</td>
                    <td>{pet.type}</td>
                    <td>
                        <Link to={ "pets/" + pet._id }>Detail</Link>
                        <hr/>
                        <Link to={ "pets/" + pet._id + "/edit" }>Edit</Link>
                    </td>
                </tr>
                })}
            </table>
        </div>
    )
}
