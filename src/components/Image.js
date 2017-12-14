import React, { Component } from 'react';

const Image = ({ image }) => (
    <div className="tile" key={image.id} >
        <img src={image.url} alt={image.alt} caption={image.caption} />
        <div className='caption'>{image.caption}</div>
    </div>
)

export default Image;