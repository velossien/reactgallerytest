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
            notification:''
        }

        this.addNewImage = this.addNewImage.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:1088/images.json').then(response => {
            console.log(response);
            this.setState({ images: response.data });
        })
            .catch(error => console.log(error));
    }

    addNewImage = () => {
        axios.post(
            'http://localhost:1088/images',
            {
                image:
                    {
                        url: '',
                        alt: '',
                        caption: ' '
                    }
            }
        )
            .then(response => {
                console.log(response);
                //make a new copy of this.state.images and use the $splice command to insert the new image (in response.data) at the 0th index of this array
                const images = update(this.state.images, {
                    $splice: [[0, 0, response.data]]
                });
                //use this new images array to update the state
                this.setState({
                    images: images,
                    editingImageId: response.data.id
                });
            })
            .catch(error => console.log(error))
    };

    //find index of the edited idea in the array and use $set to replace the old value with the new one
    updateImage= (image)=>{
        const imageIndex = this.state.images.findIndex(x => x.id === image.id);
        const images = update(this.state.images, {
            [imageIndex]: {$set: image}
        });
        this.setState({
            images:images,
        notification: 'All changes saved'});
    }

    resetNotification=()=>{
        this.setState({notification:''});
    }

    render() {
        return (
            <div>
                <button className="new-image-button"
                    onClick={this.addNewImage} >
                    New Image
                </button>
                <span className="notification">
                    {this.state.notification}
                </span>

                <div className="gallery">
                    {this.state.images.map((image) => {
                        if (this.state.editingImageId === image.id) {
                            return (<ImageForm 
                                        image={image} 
                                        key={image.id}
                                        updateImage={this.updateImage}
                                        resetNotification={this.resetNotification} />)
                        } else {
                            return (
                                <Image image={image} key={image.id} />
                            )
                        }

                    })}
                </div>

            </div>

        )
    }
}