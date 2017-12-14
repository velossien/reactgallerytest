import React, { Container, Component } from 'react';
import axios from 'axios';

class ImageForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: this.props.image.url,
            alt: this.props.image.alt,
            caption: this.props.image.caption
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInput = (e) => {
        this.props.resetNotification();
        this.setState({[e.target.name]:e.target.value})
    }

    handleBlur=()=>{
        const image={
            url: this.state.url,
            alt: this.state.alt,
            caption: this.state.caption
        }

        axios.put(
            `http://localhost:1088/images/${this.props.image.id}`,
            {
                image:image
            })
            .then(response =>{
                console.log(response);
                this.props.updateImage(response.data);
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
            <div className="image_form">
                <form onBlur={this.handleBlur}>
                    <input 
                        className="input" 
                        type="text" 
                        name="url" 
                        placeholder="Enter the URL of your image." 
                        value={this.state.url}
                        onChange={this.handleInput}/>
                    <textarea 
                        className="input" 
                        name="alt" 
                        placeholder="Alternative text for your image"
                        value={this.state.alt}
                        onChange={this.handleInput}
                        />
                    <textarea 
                        className="input" 
                        name="caption" 
                        placeholder="Caption for your image"
                        value={this.state.caption}
                        onChange={this.handleInput}/>
                </form>
            </div>
        );
    };
};

export default ImageForm;