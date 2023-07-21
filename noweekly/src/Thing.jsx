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
        }).catch((err) => {
            console.log(err);
        });
    }

    const onTaskFinish = (e) => {
        let id = e.target.id;
        axios.post(`http://127.0.0.1:5000/finish?page_id=${id}&result=${e.target.checked}&property_name=${e.target.name}`)
        .then((res) => {
            console.log(res)
            getData() 
        }).catch((err) => {
            console.log(err);
        });
    }

    // this button is clicked when user wants to change which properties they want to include
    const onPropertiesChange = async() => {
        navigate('/select')
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let big_row = []
        let attributes = JSON.parse(localStorage.getItem('noweekly'))
        let activated = [] 
        for (var attribute of attributes) {
            if (attribute[3] == true) {
                activated.push(attribute[2])
            }
        }
        console.log(data)
        for (var row of data) {
            let arr = []
            for (var key of Object.keys(row[1])) {
                let property = row[1][key]
                let type = property['type']
                if (!activated.includes(property['id']) && type != 'checkbox') {
                    continue
                }
                
                console.log(key, type, property)

                if (type == 'checkbox')  {
                    arr.unshift(
                        <Checkbox onClick={(e) => onTaskFinish(e)} name={key} id={row[0]} clicked={property['checkbox']}/>
                    )
                } else if (type == 'multi_select') {
                    console.log("type is multiselect ")
                    arr.push(
                        <div className="flexrow">
                            <p className="title_multi">{key}</p>
                            <p className="element">{property['multi_select'][0]['name']}</p>
                        </div>
                    )
                } else if (type == 'date') {
                    arr.push(
                        <div className="flexrow">
                            <p className="title_date">{key}</p>
                            <p className="element">{property['date']['start']}</p>
                        </div>
                    )
                } else if (type == 'rich_text') {
                    arr.push(
                        <div className="flexrow">
                            <p className="title_text">{key}</p>
                            <p  className="element">{property['rich_text'][0]['plain_text']}</p>
                        </div>
                    )
                } else if (type == 'number') {
                    arr.push(
                        <div className="flexrow">
                            <p className="title_num">{key}</p>
                            <p className="element">{property['number']}</p>
                        </div>
                    )
                } else if (type == 'title') {
                    arr.push(
                        <div className="flexrow">
                            <p className="title_title">{key}</p>
                            <p className="element">{property['title'][0]['plain_text']}</p>
                        </div>
                    )
                }
            }

            let array = []
            for (let a of arr) {
                array = array.concat(a)
            }
            
            big_row.push(array)
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
