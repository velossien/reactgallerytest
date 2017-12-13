import React, { Component } from 'react';
import axios from 'axios';

export default class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:1088/images').then(response => {
            console.log(response);
            this.setState({ images: response.data });
        })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="gallery">
                {this.state.images.map((image) => {
                    return (
                        <div className="tile" key={image.id} >
                            <img src={image.url} alt={image.alt} caption={image.caption}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}