import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Image from './Image';
import ImageForm from './ImageForm';

export default class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            editingImageId: null,
            formExists: false
        }

        this.openForm = this.openForm.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:1088/images.json').then(response => {
            console.log(response);
            this.setState({ images: response.data });
        })
            .catch(error => console.log(error));
    }

    openForm=()=>{
        this.setState({formExists: true});
    }

    //find index of the edited idea in the array and use $set to replace the old value with the new one
    updateImage = (image) => {
        const imageIndex = this.state.images.findIndex(x => x.id === image.id);
        const images = update(this.state.images, {
            [imageIndex]: { $set: image }
        });
        this.setState({
            images: images
        });
    }

    render() {
        let newImageForm;

        if (this.state.formExists) {
            newImageForm = (
                <ImageForm />
            );
        } else {
            newImageForm = (null);
        };

    return(
            <div>
                <button className="new-image-button"
                    onClick={this.openForm} >
                    New Image
                </button>
                
                { newImageForm }

                <div className="gallery">
                    {this.state.images.map((image) => {
                        return(
                            <Image image={image} key={image.id} />
                        )
                    })}
                </div>
            </div>

        )
}
}