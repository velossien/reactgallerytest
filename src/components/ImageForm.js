import React, { Container, Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';

class ImageForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: '',
            alt: '',
            caption: ''
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=()=>{
        const image={
            url: this.state.url, 
            alt: this.state.alt, 
            caption: this.state.caption
        }


        axios.post(
            'http://localhost:1088/images',
            {
                image:image
            })
            .then(response => {
                console.log("response");
                console.log(response.data);
                this.props.updateImage(response.data);
                // //make a new copy of this.state.images and use the $splice command to insert the new image (in response.data) at the 0th index of this array
                // const images = update(this.state.images, {
                //     $splice: [[0, 0, response.data]]
                // });
                // //use this new images array to update the state
                // this.setState({
                //     images: images
                // });
            })
            .catch(error => console.log(error))
    };


    render(){
        return(
            <div className="image_form">
                <form>
                    <input 
                        className="input" 
                        type="text" 
                        name="url" 
                        placeholder="Enter the URL of your image."
                        value={this.state.url}
                        onChange= {this.handleInput}
                        />
                    <textarea 
                        className="input" 
                        name="alt" 
                        placeholder="Alternative text for your image"
                        value={this.state.alt}
                        onChange= {this.handleInput}
                        />
                    <textarea 
                        className="input" 
                        name="caption" 
                        placeholder="Caption for your image"
                        value={this.state.caption}
                        onChange= {this.handleInput}
                        />
                    <button
                        type="button"
                        className="submit"
                        onClick={this.handleSubmit}>
                        Create Image
                    </button>
                </form>
            </div>
        );
    };
};

export default ImageForm;