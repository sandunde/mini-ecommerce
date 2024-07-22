import React, { useState, useRef } from 'react';
import axios from 'axios';
import "./New.css";
import Arrow from "../../assets/arrow.svg";
import { Form, Row, Col, Button } from 'react-bootstrap';

const New = () => {
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [qty, setQty] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        if (event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const addItem = () => {
        const formData = new FormData();
        formData.append('sku', sku);
        formData.append('name', name);
        formData.append('qty', qty);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('price', price);

        axios.post('http://localhost:5000/items', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            setSku('');
            setName('');
            setQty(0)
            setImage(null);
            setDescription('')
            setPrice(0)
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <div className='new-product'>
                <h2>PRODUCTS</h2>
                <img src={Arrow} alt='arrow' />
                <h5> Add new product</h5>
            </div>
            <Row>
                <Col xs={6}>
                    <div className='sku-section'>
                        <Form>
                            <Form.Group as={Row} className='mb-3' controlId='formHorizontal'>
                                <Form.Label column sm={2}>
                                    SKU
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={sku} onChange={e => setSku(e.target.value)} className='form-box' />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <div className='sku-section'>
                        <Form>
                            <Form.Group as={Row} className='mb-3' controlId='formHorizontal'>
                                <Form.Label column sm={2}>
                                    Price
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} className='form-box' />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <div className='sku-section'>
                        <Form>
                            <Form.Group as={Row} className='mb-3' controlId='formHorizontal'>
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} className='form-box' />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <div className='sku-section'>
                        <Form>
                            <Form.Group as={Row} className='mb-3' controlId='formHorizontal'>
                                <Form.Label column sm={2}>
                                    QTY
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="number" value={qty} onChange={e => setQty(e.target.value)} className='form-box' />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
            <div className='description-section'>
                <Form>
                    <Form.Group className='mb-3' controlId='formHorizontal'>
                        <Form.Label column sm={2}>
                            Product Description
                        </Form.Label>
                        <p>A small description about the product</p>
                        <Col sm={10}>
                            <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} className='form-box-desc' />
                        </Col>
                    </Form.Group>
                </Form>
            </div>

            <div className='image-section'>
                <div className='image-content'>
                    <h5>Product Images</h5>
                    <p>JPEG, PNG, SVG or GIF <br />
                        (Maximum file size 50MB)</p>
                </div>
                <div className='show-image'></div>
                <Button onClick={triggerFileInput}>Add Images</Button>
                <input 
                type="file" 
                ref={fileInputRef}
                style={{ display: 'none' }} 
                onChange={handleFileUpload} 
            />
            </div>
            <div className='add-btn'>
                <Button onClick={addItem}>Add Product</Button>
            </div>
        </div>
    )
}

export default New