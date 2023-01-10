import React from "react";
import { asset } from '../common/assets';

import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    HatenaIcon,
    HatenaShareButton,
    InstapaperIcon,
    InstapaperShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    LivejournalIcon,
    LivejournalShareButton,
    MailruIcon,
    MailruShareButton,
    OKIcon,
    OKShareButton, PinterestIcon,
    PinterestShareButton, RedditIcon, RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";


export default class SocialShare extends React.Component {

    constructor(props) {
        super(props)

    }



    render() {
        const { index, item, isCompareEnable } = this.props;
        //console.log(item,item.isFavorite,'ProdBox');
        return (
            <>
                <div className="dropdown">

                    <button className="share_btn_ btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Share <img src={`${asset}images/share.png`} alt="qr-code" /></button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1-white" style={{ width: '60px', height: '200px', overflow: 'scroll' }}>
                        <li><button className="dropdown-item"><FacebookShareButton url={window.location.href}>
                            <FacebookIcon size={32} /> Facebook
                        </FacebookShareButton></button></li>
                        <li><button className="dropdown-item"><WhatsappShareButton url={window.location.href}>
                            <WhatsappIcon size={32} /> Whatsapp
                        </WhatsappShareButton></button></li>
                        <li><button className="dropdown-item"><TelegramShareButton url={window.location.href}>
                            <TelegramIcon size={32} /> Telegram
                        </TelegramShareButton></button></li>
                        <li><button className="dropdown-item"><HatenaShareButton url={window.location.href}>
                            <HatenaIcon size={32} /> Hatena
                        </HatenaShareButton></button></li>
                        <li><button className="dropdown-item"><EmailShareButton url={window.location.href}>
                            <EmailIcon size={32} /> Email
                        </EmailShareButton></button></li>
                        <li><button className="dropdown-item"><InstapaperShareButton url={window.location.href}>
                            <InstapaperIcon size={32} /> Instapaper
                        </InstapaperShareButton></button></li>
                        <li><button className="dropdown-item"><LinkedinShareButton url={window.location.href}>
                            <LinkedinIcon size={32} /> Linkedin
                        </LinkedinShareButton></button></li>
                        <li><button className="dropdown-item"><TwitterShareButton url={window.location.href}>
                            <TwitterIcon size={32} /> Twitter
                        </TwitterShareButton></button></li>
                        <li><button className="dropdown-item"><LineShareButton url={window.location.href}>
                            <LineIcon size={32} /> Line
                        </LineShareButton></button></li>
                        <li><button className="dropdown-item"><LivejournalShareButton url={window.location.href}>
                            <LivejournalIcon size={32} /> Line Journal
                        </LivejournalShareButton></button></li>
                        <li><button className="dropdown-item"><OKShareButton url={window.location.href}>
                            <OKIcon size={32} />  OK
                        </OKShareButton></button></li>
                        <li><button className="dropdown-item"><MailruShareButton url={window.location.href}>
                            <MailruIcon size={32} /> Mailru
                        </MailruShareButton></button></li>
                        <li><button className="dropdown-item"><PinterestShareButton url={window.location.href}>
                            <PinterestIcon size={32} /> Pinterest
                        </PinterestShareButton></button></li>
                        <li><button className="dropdown-item"><RedditShareButton url={window.location.href}>
                            <RedditIcon size={32} /> Reddit
                        </RedditShareButton></button></li>

                    </ul>
                </div>
            </>
        );
    }
}
