"use client"
import { useEffect, useState } from 'react';
import variable from '../../styles/variables.module.scss';

export default function Javascript() {
    const [station, setStation] = useState([]);
    const [header, setHeader] = useState([]);

    useEffect(() => {
        fetch('https://api.irail.be/stations/?format=json&lang=en').then((resp) => {
            return resp.json()
        }).then((data) => {
            if (data?.station && Array.isArray(data?.station)) {
                const AllowedColumns = ['Name', 'Latitude', 'Longitude'];
                const AllowedData = [];

                data?.station.map((item) => {
                    item['Name'] = item['name'];
                    item['Latitude'] = item['locationY'];
                    item['Longitude'] = item['locationX'];
                    delete (item['name']);
                    delete (item['locationY']);
                    delete (item['locationX']);
                    delete (item['id']);
                    delete (item['@id']);
                    delete (item['standardname']);
                });
                setHeader([...Object.keys(data?.station[0]), "Notes"]);
                setStation(data.station);
            }
        })
    }, [])

    const StationHeader = ((headers) => {
        return (
            <tr>
                {header.map((header) => {
                    return <th>{header}</th>
                })}
            </tr>
        )
    });
    
    const StationDetails = ({station}) => {
        return (
            <tr>
                <td><a href={`https://www.google.com/maps/search/?api=1&query=${station.Latitude},${station.Longitude}`}>{station.Name}</a></td>
                <td>{station.Latitude}</td>
                <td>{station.Longitude}</td>
                <td><input type='text' placeholder='Enter Note'/></td>
            </tr>
        )
    }

    return (
        <>
        <div className={variable.dflex}>
            <table className={variable.table}>
                {header && header.map((item) => {
                    return <th>{item}</th>
                })}
                {station && station.map((station) => {
                    return <StationDetails station={station}/>
                })}
            </table>
        </div>
        </>
    );
}
