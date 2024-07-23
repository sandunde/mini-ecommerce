import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Arrow from "../../assets/arrow.svg";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import "./Edit.css";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/items/${id}`)
      .then(response => {
        const product = response.data;
        setSku(product.sku);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setQty(product.qty);
        setExistingImages(product.images || []);
      }).catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setImages(files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('name', name);
    formData.append('qty', qty);
    formData.append('description', description);
    formData.append('price', price);

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.put(`http://localhost:5000/update-items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className='new-product'>
        <h2>PRODUCTS</h2>
        <img src={Arrow} alt='arrow' />
        <h5>Edit product</h5>
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
              <Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)} className='form-box-desc' />
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
        <div className='show-images'>
          {images.length > 0 && images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`New Product ${index + 1}`}
              width="100"
              height="100"
              style={{ borderRadius: "20px", marginTop: "10px", marginRight: "10px" }}
            />
          ))}
          {existingImages.length > 0 && existingImages.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000${image}`}
              alt={`Existing Product ${index + 1}`}
              width="100"
              height="100"
              style={{ borderRadius: "20px", marginTop: "10px", marginRight: "10px" }}
            />
          ))}
        </div>
        <Button onClick={triggerFileInput}>Edit Images</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileUpload}
        />
      </div>
      <div className='add-btn'>
        <Button onClick={handleUpdate}>Save changes</Button>
      </div>
    </div>
  );
};

export default Edit;
