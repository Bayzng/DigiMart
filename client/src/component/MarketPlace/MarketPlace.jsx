import React, { useState, useEffect } from 'react';
import airpods from "../../assets/airpods.png";
import Navbar from '../Navbar/Navbar';
import { useEthereum } from '../../context/EthereumContext';
import "./MarketPlace.css";

const MarketPlace = () => {
  const { buyGadget, userAddress, isConnected } = useEthereum();

  const handleBuyGadget = (index, price) => {
    if (price && !isNaN(price) && parseFloat(price) > 0) {
      buyGadget(price.toString());
      updatePurchaseStatus(index);
    } else {
      alert('Please select a valid gadget to purchase.');
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [gadgetName, setGadgetName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [gadgets, setGadgets] = useState([]);
  const [purchaseStatus, setPurchaseStatus] = useState([]); // New state for purchase status

  useEffect(() => {
    const storedGadgets = JSON.parse(localStorage.getItem('gadgets')) || [];
    setGadgets(storedGadgets);
    const storedPurchaseStatus = JSON.parse(localStorage.getItem('purchaseStatus')) || [];
    setPurchaseStatus(storedPurchaseStatus);
  }, []);

  const updatePurchaseStatus = (index) => {
    const updatedStatus = [...purchaseStatus];
    updatedStatus[index] = true;
    setPurchaseStatus(updatedStatus);
    localStorage.setItem('purchaseStatus', JSON.stringify(updatedStatus));
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleAddGadget = () => {
    const newGadget = {
      name: gadgetName,
      description: description,
      price: price,
      image: image || airpods
    };

    const updatedGadgets = [...gadgets, newGadget];
    setGadgets(updatedGadgets);
    localStorage.setItem('gadgets', JSON.stringify(updatedGadgets));

    // Add false to purchase status for the new gadget
    const updatedStatus = [...purchaseStatus, false];
    setPurchaseStatus(updatedStatus);
    localStorage.setItem('purchaseStatus', JSON.stringify(updatedStatus));

    setGadgetName('');
    setDescription('');
    setPrice('');
    setImage('');

    toggleModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteGadget = (index) => {
    const updatedGadgets = gadgets.filter((_, i) => i !== index);
    const updatedStatus = purchaseStatus.filter((_, i) => i !== index);
    setGadgets(updatedGadgets);
    setPurchaseStatus(updatedStatus);
    localStorage.setItem('gadgets', JSON.stringify(updatedGadgets));
    localStorage.setItem('purchaseStatus', JSON.stringify(updatedStatus));
  };

  return (
    <div className='marketPlace'>
      <Navbar />
      <div className='marketPlace-header'>
        <div className='marketPlace-contentOne'>
          <p>Up to 10% OFF</p>
          <h1>Trendy Collection</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam eos nesciunt libero fuga <br /> repellat labore praesentium ipsum sed explicabo iusto.</p>
          <button>Discover Now</button>
        </div>
        <div>
          <img src={airpods} alt="Airpods" />
        </div>
      </div>

      <h2 className='marketPlace-digimart'>Welcome To DigiMart</h2>
      <h3 className='marketPlace-digimart-h3'>Your wallet Address: <span>{userAddress}</span></h3>

      {!isConnected ? (
        <p className='connect-wallet-notification'>
          Please connect your wallet to see available products.
        </p>
      ) : (
        <div className='marketplace-product-header'>
          {gadgets.map((gadget, index) => (
            <div className='marketPlace-product' key={index}>
              <h3>{gadget.name}</h3>
              <p>{gadget.description}</p>
              {purchaseStatus[index] ? (
                <button disabled>Purchased</button>
              ) : (
                <button onClick={() => handleBuyGadget(index, gadget.price)}>Buy Now</button>
              )}
              <img src={gadget.image} alt={gadget.name} />
              <h2>${gadget.price}</h2>

              
              <button className='delete-button' onClick={() => handleDeleteGadget(index)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className='marketplace-AddItems'>
        <button onClick={toggleModal}>Add Items</button>
      </div>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Add New Gadget</h2>
            <label>Gadget Name</label>
            <input
              type='text'
              placeholder='Enter gadget name'
              value={gadgetName}
              onChange={(e) => setGadgetName(e.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Price</label>
            <input
              type='text'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Upload Image</label>
            <input type='file' accept='image/*' onChange={handleImageUpload} />
            {image && <img src={image} alt="Preview" className="image-preview" />}
            <button onClick={toggleModal}>Close</button>
            <button onClick={handleAddGadget}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
