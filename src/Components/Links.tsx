import React from 'react';
import { Link } from 'react-router-dom';

const Links = () => {
    return (
        <div style={{margin: "10px"}}>
            <Link to="/" style={{marginRight: "30px"}}>Home</Link>
            <Link to="/profile" style={{marginRight: "30px"}}>Profile</Link>
            <Link to="/friends" style={{marginRight: "30px"}}>Friends</Link>
        </div>
    );
};

export default Links;
