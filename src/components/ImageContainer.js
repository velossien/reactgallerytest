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

    openForm = () => {
        this.setState({ formExists: true });
    }

    //find index of the edited idea in the array and use $set to replace the old value with the new one
    updateImage = (image) => {
        //make a new copy of this.state.images and use the $splice command to insert the new image (in response.data) at the 0th index of this array
        const images = update(this.state.images, {
            $splice: [[0, 0, image]]
        });
        //use this new images array to update the state
        this.setState({
            images: images,
            formExists: false
        });
    }

    render() {
        let newImageForm;

        if (this.state.formExists) {
            newImageForm = (
                <ImageForm
                    updateImage={this.updateImage} />
            );
        } else {
            newImageForm = (null);
        };

        return (
            <div>
                <button className="new-image-button"
                    onClick={this.openForm} >
                    Add a Nick
                </button>

                {newImageForm}

                <div className="gallery">
                    {this.state.images.map((image) => {
                        return (
                            <Image image={image}
                                   key={image.id} />
                        )
                    })}
                </div>
            </div>

        )
    }
}