import React, { Component } from 'react';
import { Route } from 'react-router';
import ImageUploader from 'react-images-upload';
import './custom.css'
import ImageList from './components/ImageList';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
   static displayName = App.name;
    constructor(props) {
        super(props);
        this.ItemListElement = React.createRef();
        this.state = {
            list: [],
            selectedFile: null,
            guid: uuidv4(),
            value: "",
            showError: false,
            errorMessage:""
        }

    }

    onAddItem = () => {
        this.setState({ showError: false });
        if (this.state.selectedFile == null || this.state.value == "") {
            this.setState({ showError: true, errorMessage: "Error: file name or image are missing" });
            return false;
        }
        let updateForm = this.state.selectedFile;
        updateForm.append('fileName', this.state.value);
        this.setState({ selectedFile: updateForm });

        this.UploadImage();

    };

    async UploadImage() {
        try {
            const response =await fetch('api/createimage',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: this.state.selectedFile
                });
            if (response) {
                this.setState(this.state);
                this.ItemListElement.current.populateImagesData(this.state.guid);
            }
            else {
                throw '- Server error';
            }   
        } catch (err) {
            this.setState({
                showError: true,
                errorMessage: "Error in file upload " + err.errorMessage
            });      
        }        
    }


    onChangeHandler = event => {
        let form = new FormData();
        var element = event.target.files[0];
        form.append('image', element);
        form.append('guid', this.state.guid)
        this.setState({           
            selectedFile: form,
            loaded: 0,
            guid: this.state.guid
        })
        console.log(this.state);
    }

    onTextChanged = event => {
        this.setState({ value: event.target.value });
    }

    render() {
      
        return (
            <div className="gridcontainer">
                <div className="leftpane">
                    <div className="errordiv" style={{ display: this.state.showError ? 'block' : 'none' }}>{this.state.errorMessage}</div>
                    <ul>
                        <li className="applistitem"> <input type="text" onChange={this.onTextChanged} value={this.state.value} /></li>
                        <li className="applistitem"> <input type="file" onChange={this.onChangeHandler} accept=".jpg,.jpeg,.png" /></li>
                        <li className="applistitem"><input type="button" value="Add" onClick={this.onAddItem} /></li>
                    </ul>
                </div>
                <div className="rightpane">
                    <ImageList guid={this.state.guid} ref={this.ItemListElement} />
                </div>

        </div>
    );
  }
}
