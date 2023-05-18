/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Select(props) {

    const [properties, setProperties] = useState([])

    useEffect(() => {
        let attributes = localStorage.getItem('noweekly')
        if (attributes == undefined) {
            console.log("no noweekly data stored")
            // get database properties to choose
        } else {
            // show properties
        }
    })

    // when property is checked
    const onCheck = () => {
        
    }

    const getDatabase = async() => {
        axios.get(`http://127.0.0.1:5000/properties`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // this button is clicked when user is finished clicking the properties they want to include
    const onPropertiesFinish = async() => {
        // properties would look like: 
        // [attribute, true/false] 
        // attribute is [name, id, type]
        // set properties in local storage

        // usenavigate to Thing
    }

    return (
        <div>

        </div>
    )
}

export default Select;