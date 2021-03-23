import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import SocialMediaLogos from '../../../assets/img/social-media'
import PaymentMethodLogos from '../../../assets/img/payment-methods'

import './footer.scss';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleOnChange = e => {
        const inputValue = e.currentTarget.value;

        setEmail(inputValue);
    }

    return (
        <div className={'footer-wrapper'}>
            <div className="social-media-section section-layout">
                <div className="title">Follow</div>
                <div className="images">
                    <SocialMediaLogos.FacebookLogo />
                    <SocialMediaLogos.GoogleLogo />
                    <SocialMediaLogos.InstagramLogo />
                    <SocialMediaLogos.PinterestLogo />
                    <SocialMediaLogos.YoutubeLogo />
                    <SocialMediaLogos.TwitterLogo />
                </div>
            </div>
            <div className="promotion-section">
                <div className="subscription section-layout">
                    <div className='title'>Subscribe us for more discounts</div>
                    <div className="input-section">
                        <input onChange={handleOnChange} type="text" value={email} placeholder={'Your email?'} />
                        <Button children={'Subscribe'} />
                    </div>
                </div>
                <div className="support-payments section-layout">
                    <div className='title'>Payment methods</div>
                    <div className="images">
                        <PaymentMethodLogos.AmexLogo />
                        <PaymentMethodLogos.BitcoinLogo />
                        <PaymentMethodLogos.AeLogo />
                        <PaymentMethodLogos.MasterCardLogo />
                        <PaymentMethodLogos.VisaLogo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;



