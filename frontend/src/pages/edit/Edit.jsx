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
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/items/${id}`)
      .then(response => {
        const product = response.data;
        setSku(product.sku);
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setQty(product.qty)
        setExistingImage(product.image)
      }).catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      const fileURL = URL.createObjectURL(files[0]);
      setExistingImage(fileURL);
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

    if (image) {
      formData.append('image', image);
    } else {
      formData.append('existingImage', existingImage);
    }

    try {
      await axios.put(`http://localhost:5000/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/')
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className='new-product'>
        <h2>PRODUCTS</h2>
        <img src={Arrow} alt='arrow' />
        <h5> Edit product</h5>
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
              <Form.Control type="textarea" value={description} onChange={e => setDescription(e.target.value)} className='form-box-desc' />
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
        <div className='image-wrapper'>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="New Product"
              width="100"
              height="100"
            />
          )}
          {existingImage && !image && (
            <img
              src={`http://localhost:5000${existingImage}`}
              alt="Product"
              width="100"
              height="100"
              style={{ borderRadius: "20px", marginTop:"60px" }}
            />
          )}
        </div>

        <Button onClick={triggerFileInput}>Edit Images</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>
      <div className='add-btn'>
        <Button onClick={handleUpdate}>Save changes</Button>
      </div>
    </div>
  )
}

export default Edit