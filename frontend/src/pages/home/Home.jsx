import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { Table } from 'react-bootstrap';
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import Star from "../../assets/star.svg";
import Starred from "../../assets/starred.svg";

const Home = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => {
                setItems(response.data);
                setFilteredItems(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleStarToggle = async (id, currentStarred) => {
        try {
            const updatedItem = await axios.put(`http://localhost:5000/items/${id}`, { starred: !currentStarred });
            setItems(items.map(item => item._id === id ? updatedItem.data : item));
            setFilteredItems(filteredItems.map(item => item._id === id ? updatedItem.data : item));
        } catch (error) {
            console.error("Error updating starred status", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/items/${id}`);
            setItems(items.filter(item => item._id !== id));
            setFilteredItems(filteredItems.filter(item => item._id !==id));
        } catch (error) {
            console.error("Error deleting item" ,error)
        }
    }

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
        }
        setSearchClicked(true);
    };

    return (
        <div>
            <div className='new-product'>
                <h2>PRODUCTS</h2>
            </div>
            <div className='header-section'>
                <input 
                    type="text" 
                    placeholder="Search for a product" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchClicked && (
                <div className='search-results'>
                    <small>{filteredItems.length} results found for "{searchQuery}"</small>
                </div>
            )}
            <div className='product-table-container'>
                <Table className='product-table'>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>IMAGE</th>
                            <th>PRODUCT NAME</th>
                            <th>PRICE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.sku}</td>
                                <td>
                                    <img src={`http://localhost:5000${item.image}`} alt={item.name} width="50" height="50" />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <div className="action-btn">
                                        <img src={Delete} alt='delete' onClick={() => handleDelete(item._id)}/>
                                        <img src={Edit} alt='edit' onClick={() => handleEdit(item._id)} />
                                        <img 
                                            src={item.starred ? Starred : Star} 
                                            alt='star' 
                                            onClick={() => handleStarToggle(item._id, item.starred)} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Home;
