import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Arrow from "../../assets/arrow.svg";
import { Row, Col, Button} from 'react-bootstrap';
import Starred from "../../assets/starred.svg";
import Search from "../../assets/scope.png";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { searchQuery = '', filteredItems = [] } = location.state || {};

    console.log('SearchQuery:', searchQuery);
    console.log('FilteredItems:', filteredItems);

    const [items, setItems] = useState([]);

    const handleCreate = () => {
        navigate('/create');
    };

    const handleHome = () => {
        navigate('/');
    };


    const handleSearch = () => {
        const query = searchQuery.trim().toLowerCase();
        let filtered;
        if (query === '') {
            filtered = items;
        } else {
            filtered = items.filter(item => item.name.toLowerCase().includes(query));
        }
        navigate('/search-results', { state: { searchQuery: searchQuery, filteredItems: filtered } });
    };


    return (
        <div className='search-results'>
            <div className='new-product'>
                <h2 onClick={handleHome}>PRODUCTS</h2>
            </div>
            <div className='header-section'>
                <Row className='header-section'>
                    <Col xs={8}>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search for a product"
                                value={searchQuery}
                            />
                            <Button onClick={handleSearch}><img src={Search} alt="search" /> Search</Button>
                        </div>
                    </Col>
                    <Col xs={2} className='col-2'>
                        <Button onClick={handleCreate}>New Product</Button>
                    </Col>
                    <Col xs={1} className='column-3'>
                        <Button><img src={Starred} alt='star'  /></Button>
                    </Col>
                </Row>
            </div>
            <p className='search-length'>{filteredItems.length} results found for '{searchQuery}'</p>
            {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                    <div key={item._id} className='search-result-item'>
                        <div className='search-product-details'>
                            <h5>{item.sku}</h5>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <Button onClick={() => navigate(`/edit/${item._id}`)}>
                            <img src={Arrow} alt="arrow" />
                        </Button>
                    </div>
                ))
            ) : (
               null
            )}
        </div>
    );
};

export default SearchResults;
