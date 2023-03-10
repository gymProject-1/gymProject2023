import { useState, useEffect } from 'react';
import axios from 'axios';
import './prices.css';

const Prices = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3600/api/price')
            .then(response => {
                console.log(response.data);
                setRows(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleChoosingButtonClick = (rowId) => {

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const current = new Date();
        const date = current.getDate();
        //const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        const numEnters = rows[rowId].numEnter;
        const type = rows[rowId].type;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log("before");
        axios.post("http://localhost:3600/api/purchase", { userId: userId, type: type, numEnters: 100 },
            config
        ).then(console.log).catch(console.log);

        const updatedRows = rows.map((row) => {
            if (row.id === rowId)
                return { ...row, choosing: 'bought' };
            else
                return row;
        })
        setRows(updatedRows);
    };

    return (
        <div className="prices">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>term</th>
                        <th>num Of Enters</th>
                        <th>Choosing</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>{row.type}</td>
                            <td>{row.price}</td>
                            <td>{row.term}</td>
                            <td>{row.numOfEnters}</td>
                            <td>
                                {row.choosing === 'bought' ? (
                                    'bought'
                                ) : (
                                    <button onClick={() => handleChoosingButtonClick(row.id)}>
                                        Buy
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prices;
