import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { Table, Row, Col, Button, Modal } from 'react-bootstrap';
import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import Star from "../../assets/star.svg";
import Starred from "../../assets/starred.svg";
import Search from "../../assets/scope.png";
import Danger from "../../assets/danger.png";

const Home = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [starredClick, setStarredClick] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => {
                setItems(response.data);
                setFilteredItems(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
        } else {
            const query = searchQuery.trim().toLowerCase();
            const filteredSuggestions = items.filter(item =>
                item.name.toLowerCase().includes(query)
            );
            setSuggestions(filteredSuggestions);
        }
    }, [searchQuery, items]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const productPage = () => {
        navigate('/create');
    };

    const handleStarred = () => {
        setFilteredItems(items.filter(item => item.starred));
        setSearchClicked(false);
        setStarredClick(true);
    };

    const handleStarToggle = async (id, currentStarred) => {
        try {
            await axios.put(`http://localhost:5000/update-items/${id}`, { starred: !currentStarred });
            const updatedItems = items.map(item =>
                item._id === id ? { ...item, starred: !currentStarred } : item
            );
            setItems(updatedItems);

            const updatedFilteredItems = filteredItems.map(item =>
                item._id === id ? { ...item, starred: !currentStarred } : item
            );
            setFilteredItems(updatedFilteredItems);
        } catch (error) {
            console.error("Error updating starred status", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/delete-items/${deleteId}`);
            setItems(items.filter(item => item._id !== deleteId));
            setFilteredItems(filteredItems.filter(item => item._id !== deleteId));
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    const handleSearch = () => {
        const query = searchQuery.trim().toLowerCase();
        let filtered;
        if (query === '') {
            filtered = items;
        } else {
            filtered = items.filter(item => item.name.toLowerCase().includes(query));
        }
        setFilteredItems(filtered);
        setSearchClicked(true);
        navigate('/search-results', { state: { searchQuery: searchQuery, filteredItems: filtered } });
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.name);
        setSuggestions([]);
        handleSearch();
    };

    const showDeleteModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const hideDeleteModal = () => {
        setShowModal(false);
        setDeleteId(null);
    };

    return (
        <div>
            <div className='new-product'>
                <h2>
                    {starredClick ? "FAVOURITE PRODUCTS" : "PRODUCTS"}
                </h2>
            </div>
            <div className='header-section'>
                <Row className='header-section'>
                    <Col xs={8}>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search for a product"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button onClick={handleSearch} disabled={!searchQuery}><img src={Search} alt="search" /> Search</Button>
                            {suggestions.length > 0 && (
                                <div className="suggestions">
                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion._id}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xs={2} className='col-2'>
                        <Button onClick={productPage}>New Product</Button>
                    </Col>
                    <Col xs={1} className='column-3'>
                        <Button><img src={Starred} alt='star' onClick={handleStarred} /></Button>
                    </Col>
                </Row>
            </div>
            <div className='product-table-container'>
                <Table className='product-table'>
                    <thead>
                        <tr className='t-head'>
                            <th>SKU</th>
                            <th className='t-head'>IMAGE</th>
                            <th className='t-head'>PRODUCT NAME</th>
                            <th className='t-head'>PRICE</th>
                            <th className='t-head'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <tr key={item._id}>
                                <td>{item.sku}</td>
                                <td>
                                    <img
                                        src={item.images && item.images.length > 0 ? `http://localhost:5000${item.images[0]}` : 'default-image-url'}
                                        alt={item.name}
                                        width="50"
                                        height="50"
                                        style={{ borderRadius: "6px" }}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price}.00</td>
                                <td>
                                    <div className="action-btn">
                                        <img src={Delete} alt='delete' onClick={() => showDeleteModal(item._id)} />
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
            <Modal show={showModal} onHide={hideDeleteModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className='model-body'>
                        <img src={Danger} alt='danger' />
                        <h3>ARE YOU SURE?</h3>
                        <p>You will not be able to undo this action if you proceed!</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='cancel-btn' variant="secondary" onClick={hideDeleteModal}>
                        Cancel
                    </Button>
                    <Button className='delete-btn' variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;
