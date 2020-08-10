import React, { Component } from 'react'; 



 class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = { Images: [], loading: true };
    }


    componentDidMount() {
        this.populateImagesData(this.props.guid);
    }

     async populateImagesData(guid) {
         let guidParameter; 

         guidParameter = guid ? '?guid=' + guid : "";
         const response = await fetch('api/Images' + guidParameter);
         const data = await response.json();
         this.setState({ Images: data });
    }

    static renderImages(Images) {
        return (
            
                <ul>
                {Images.map(image =>
                    <li key={image.fileName} className="imageitem"><div className="textdiv">{image.fileName}</div><img src={"api/getImage?imageName=" + image.fileName} className="imageframe" width="80%" height="80%" /></li>)}
                </ul>
            
            );
     }
     onUploadAll = event => {        
         this.populateImagesData();
     }
      render() {
          let contents = ImageList.renderImages(this.state.Images);
          return (
              <div className="listcontainer">
                  <div className="toplhalf">
                      {contents}
                  </div>                    
                  <div className="bottomhalf">
                      <input className="loadbutton" type="button" onClick={this.onUploadAll} value="LOAD ALL" />
                  </div>
            </div>
        );
      }
    
}
export default ImageList