import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Table = () => {
    const [people, setPeople] = useState();
    const [tableData, setTableData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3007/api/v1/people");
                let data = await response.json();
                setPeople(data)
                setTableData(data)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [])

    const handleActive = () => {
        setPeople(people.filter((person) => {
            return person.status === "active"
        }))
    }

    const handleInactive = () => {
        setPeople(people.filter((person) => {
            return person.status === "inactive"
        }))
    }

    const handleReset = () => {
        setPeople(tableData);
    }


    return (
        <div>
            <button onClick={() => handleActive()}>Active</button>
            <button onClick={() => handleInactive()}>Inactive</button>
            <button onClick={() => handleReset()}>Reset</button>
            <table >
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {people && people.map(person => {
                        return (
                            <tr key={person.id}>
                                <td>{person.name}</td>
                                <td>{person.email}</td>
                                <td>{person.gender}</td>
                                <td>{person.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default Table
