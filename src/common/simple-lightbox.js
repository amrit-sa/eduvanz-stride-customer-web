import React from "react";
import $ from 'jquery';
import { asset } from "../common/assets";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";


const options = {
    buttons: {
      iconColor: "##610604",
      iconPadding: "10px"
    },
    caption: {
      caption:'fndfngfngjfd gjfngkjfdgkfjd g g gf gfjg fg fj ngfjg fj gfjd gfjdg fjdg jfd ',
      captionColor: "#61O6O4",
      captionFontSize: "20px",
      showCaption: true
    },
    settings: {
      overlayColor: "#D8B863"
    },
    thumbnails: {
      thumbnailsAlignment: "center",
    },
};
class Simplelightbox extends React.Component{


    
    render(){
    return (
        <SRLWrapper options={options}>
        <div>
          <a href="https://picsum.photos/1024/768?image=2">
            <img src="https://picsum.photos/200/300?image=2" alt="lightbox" />
            <div className="SRLCustomCaption myCustomCaptionOne">
      She found herself in a <span className="SRLCustomCaption">forest...</span>
    </div>
          </a>
        
     
        </div>
        
      </SRLWrapper>
      );
    }
}

export default Simplelightbox;