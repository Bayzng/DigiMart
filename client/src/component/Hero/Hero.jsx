import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headset from '../../assets/headset.png';
import { useEthereum } from '../../context/EthereumContext';
import './Hero.css';

const Hero = () => {
    const { connectWallet, isConnected } = useEthereum();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleConnectWallet = async () => {
        setLoading(true);
        await connectWallet();
        setLoading(false);

        if (isConnected) {
            navigate('/marketplace');
        }
    };

    return (
        <div className='Hero'>
            <div className='Hero-header'>
                <h1>EXCLUSIVE</h1>
                <h3>Digi Mart</h3>
                <img src={headset} alt="Headset" />
            </div>
            <div className='Hero-btn'>
                <button onClick={handleConnectWallet} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
            </div>
        </div>
    );
};

export default Hero;
