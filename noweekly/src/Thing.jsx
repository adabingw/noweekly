/* eslint-disable no-empty */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-env node */

import React from "react";
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * structure of a data element:
 *  {
 *      page_id
 *      properties
 *  }
 *  
 */


function Thing(props) {
    const [data, setData] = useState([]);
    const [components, setComponents] = useState([])

    const navigate = useNavigate()

    const getData = async() => {
        axios.get(`http://127.0.0.1:5000/database`)
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const onTaskFinish = (e) => {
        axios.post(`http://127.0.0.1:5000/finish?page_id=${id}`)
        .then((res) => {
            console.log(res)
            getData() 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // this button is clicked when user wants to change which properties they want to include
    const onPropertiesChange = async() => {
        navigate('/select')
    }

    useEffect(() => {
        let big_row = []
        let attributes = JSON.parse(localStorage.getItem('noweekly'))
        let activated = [] 
        for (var attribute of attributes) {
            if (attribute[3] == true) {
                activated.append(attribute[2])
            }
        }

        for (var row of data) {
            let arr = []
            for (var key of row[1]) {
                if (!activated.includes(property['id'])) {
                    continue
                }

                let property = row[key]
                let type = property['type']
                if (type == 'checkbox')  {
                    arr.push(
                        <Checkbox onClick={() => onTaskFinish()} id={row[0]} clicked={property['checkbox']}/>
                    )
                } else if (type == 'multiselect') {
                    arr.push(
                        <p>{property['multi_select']['name']}</p>
                    )
                } else if (type == 'date') {
                    arr.push(
                        <p>{property['date']['start']}</p>
                    )
                } else if (type == 'rich_text') {
                    arr.push(
                        <p>{property['title']['plain_text']}</p>
                    )
                } else if (type == 'number') {
                    arr.push(
                        <p>{property['number']}</p>
                    )
                }
            }
            
            arr = ''.join(arr)
            big_row.push(arr)
        }
        setComponents(big_row)        
    }, [data])


    return (
        <div>
            <div className="flexcol">
                {components.map((index, value) => {
                    return <div className="flexrow"> {index} </div>
                })}
            </div>
            <p className="button" onClick={() => onPropertiesChange()}>change</p>
            <p className="button" onClick={() => getData()}>refresh</p>
        </div>
    )
}

export default Thing;