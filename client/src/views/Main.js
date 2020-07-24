import React, { useEffect, useState } from 'react'
import PetList from '../components/PetList';
import axios from 'axios';

export default () => {

    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets')
            .then(res=>{
                setPets(res.data);
                setLoaded(true);
            });
    },[])

    return (
        <div>
            {loaded && <PetList pets={pets}/>}
        </div>
    )
}
