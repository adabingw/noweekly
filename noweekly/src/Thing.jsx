/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-env node */

import React from "react";
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";

/**
 * TODO:
 *  generalize data types
 *  oncheckmark clicked
 */


function Thing(props) {
    const [data, setData] = useState([]);
    const [components, setComponents] = useState([])

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

    const getDatabase = async() => {
        axios.get(`http://127.0.0.1:5000/properties`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // this button is clicked when user wants to change which properties they want to include
    const onPropertiesChange = async() => {
        // navigate to Select
    }


    useEffect(() => {
        let attributes = localStorage.getItem('noweekly')
        if (attributes == undefined) {
            console.log("no noweekly data stored")
            // get database properties to choose
        } else {
            // get data
            // 
        }
    }, [])

    useEffect(() => {
        let big_row = []
        for (var d of data) {
            console.log("what ", d)
            let row = []
            for (var i of d) {
                console.log("yey ", i)
                if (i[0] == 'checkbox') {
                    row.push(<Checkbox 
                        checked = {i[1]}
                    />)
                } else if (i[0] == 'date') {
                    row.push(<div>{i[1]}</div>)
                } else if (i[0] == 'name') {
                    row.push(<div>{i[1]}</div>)
                }
            }
            big_row.push(row)
        }
        setComponents(big_row)        
    }, [data])


    return (
        <div>
            {/* {getData()} */}
            <div className="flexcol">
                {components.map((index, value) => {
                    return <div className="flexrow"> {index} </div>
                })}
            </div>
        </div>
    )
}

export default Thing;