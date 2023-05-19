/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

function Soot(props) {

}

function Select(props) {

    /**
     * properties structure:
     * [
     *      name
     *      type
     *      id 
     *      activated
     * ]
     */
    const [properties, setProperties] = useState([['name', 'type', 'id', true], ['name 2', 'type 2', 'id 2', false]])
    const [components, setComponents] = useState([<></>])
    const navigate = useNavigate()

    useEffect(() => {
        // let attributes = JSON.parse(localStorage.getItem('noweekly'))
        // if (attributes == undefined) {
        //     console.log("getting noweekly data")
        //     getDatabase()
        // } else {
        //     console.log("noweekly data: ", attributes)

        //     // let result = []
        //     // for (var attribute of attributes) {
        //     //     console.log(attribute)
        //     //     attribute = attribute.split(',')
        //     //     result.push(attribute)
        //     // }
        //     // // attributes = attributes.split(',')
        //     // console.log(result)
        //     setProperties(attributes)
        // }
    }, [])

    useEffect(() => {
        let comp = []
        console.log(properties)
        for (var i = 0; i < properties.length; i++) {
            let property = properties[i]
            // console.log(property)
            comp.push(
                <div className="flexrow">
                    <Checkbox id={i.toString()} onChange={(e) => onCheck(e)} checked={property[3]}/>
                    <div>
                        {property[0]}
                    </div>
                </div>
            )
            setComponents(comp)
        }
    }, [properties])

    // when property is checked
    const onCheck = (e) => {
        let id = e.target.id 
        let p = [... properties] 
        p[id][3] = !p[id][3]
        setProperties(p)
    }

    const getDatabase = async() => {
        axios.get(`http://127.0.0.1:5000/properties`)
        .then((res) => {
            console.log(res.data)
            setProperties(res.data) 
            localStorage.setItem('noweekly', JSON.stringify(res.data))
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // this button is clicked when user is finished clicking the properties they want to include
    const onPropertiesFinish = async() => {
        localStorage.setItem('noweekly', JSON.stringify(properties))
        navigate('/thing')
    }

    return (
        <div className="flexcol">
            {components.map((v, i) => {
                return <div className="flexcol">{v}</div>
            })}
            <p className="button" onClick={() => onPropertiesFinish()}> ok! </p>
        </div>
    )
}

export default Select;