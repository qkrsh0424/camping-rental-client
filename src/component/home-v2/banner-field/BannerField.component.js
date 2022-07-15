import { useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const ImageBox = styled.div`
    width:100%;

   .image-figure{
        position: relative;
        padding-bottom: 30%; // 1500 x 450
        

        @media all and (max-width:992px){
            padding-bottom: 60%; // 750 x 450
        }
   }

   .image-el{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:none;
   }
`;

const SliderPrevArrow = styled.div`
    display: none;
    width:40px;
    height:40px;
    background:#40404080;
    position:absolute;
    top:50%;
    left: 30px;
    transform: translate(0, -50%);
    padding:0;
    margin:0;
    cursor: pointer;
    transition: border-radius .3s;

    &:hover{
        background:#404040;
        border-radius: 50%;

        .icon{
            opacity: 1;
        }
    }

    @media all and (max-width:992px){
        left: 20px;
        width:28px;
        height:28px;
    }

    .icon{
        width:inherit;
        height: inherit;
        opacity: 0.8;
    }
`;

const SliderNextArrow = styled.div`
    display: none;
    width:40px;
    height:40px;
    background:#40404080;
    position:absolute;
    top:50%;
    right: 30px;
    transform: translate(0, -50%);
    padding:0;
    margin:0;
    cursor: pointer;
    transition: border-radius .3s;

    &:hover{
        background:#404040;
        border-radius: 50%;

        .icon{
            opacity: 1;
        }
    }

    @media all and (max-width:992px){
        right: 20px;
        width:28px;
        height:28px;
    }

    .icon{
        width:inherit;
        height: inherit;
        opacity: 0.8;
    }
`;

const SliderNumbering = styled.div`
    user-select:none;
    position: absolute;
    bottom:20px;
    right:30px;
    background:#40404080;
    width:80px;
    padding: 17px 0;
    color:#fff;
    text-align:center;
    border-radius:10px;
    letter-spacing:2px;
    font-size:16px;
    font-weight:600;
    transition: border-radius .3s;

    &:hover{
        border-radius:0;
    }

    @media all and (max-width:992px){
        bottom:10px;
        right:20px;
        width:55px;
        padding: 12px 0;
        font-size:11px;
    }
`;

const Container = styled.div`
    overflow: hidden;
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0px;
        margin-top: 0;
    }
    
    /* padding: 30px; */
    .slider-wrapper{
        position:relative;
        box-sizing: border-box;
        overflow: hidden;
        line-height: 0;
        border-radius: 20px;

        &:hover{
            ${SliderPrevArrow}, ${SliderNextArrow}{
                display: block;
            }
        }
        
        @media all and (max-width:992px){
            width: 100%;
            height: auto;
            border-radius: 0;
        }
    }

    .slick-dots{
        bottom:20px;
    }

    .slick-dots li.slick-active button:before {
        color:#fff !important;
        opacity: 1;
    }

    .slick-dots li button:before {
        color:#fff !important;
        opacity: 0.5;
        font-size: 12px;
    }

    .slick-prev{
        z-index: 10;
        left: 10px;
    }
    
    .slick-next{
        z-index: 10;
        right:10px;
    }
`;

const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:4000
}

const banners = [
    {
        id: uuidv4(),
        desktopBannerName: 'banner3_desktop',
        desktopBannerUri: '/assets/banner/sample3/banner3_desktop.png',
        mobileBannerName: 'banner3_mobile',
        mobileBannerUri: '/assets/banner/sample3/banner3_mobile.png'
    },
    {
        id: uuidv4(),
        desktopBannerName: 'banner1_desktop',
        desktopBannerUri: '/assets/banner/sample1/banner1_desktop.png',
        mobileBannerName: 'banner1_mobile',
        mobileBannerUri: '/assets/banner/sample1/banner1_mobile.png'
    },
    {
        id: uuidv4(),
        desktopBannerName: 'banner2_desktop',
        desktopBannerUri: '/assets/banner/sample2/banner2_desktop.png',
        mobileBannerName: 'banner2_mobile',
        mobileBannerUri: '/assets/banner/sample2/banner2_mobile.png'
    },
]

const BannerFieldComponent = () => {
    const isMobile = useMediaQuery(`(max-width: 992px)`);
    const sliderRef = useRef(null);
    const [sliderIndex, setSliderIndex] = useState({
        oldSlide: 0,
        activeSlide: 0,
        activeSlide2: 0
    });

    return (
        <>
            <Container>
                <div className='slider-wrapper'>
                    <Slider
                        ref={sliderRef}
                        {...settings}
                        beforeChange={(current, next) => {
                            setSliderIndex({
                                ...sliderIndex,
                                oldSlide: current,
                                activeSlide: next
                            })
                        }}
                        afterChange={(current) => {
                            setSliderIndex({
                                ...sliderIndex,
                                activeSlide2: current
                            })
                        }}
                    >
                        {banners?.map(r => {
                            return (
                                <ImageBox key={r.id}>
                                    <div className="image-figure">
                                        <img
                                            className='image-el'
                                            src={isMobile ? r.mobileBannerUri : r.desktopBannerUri}
                                            alt={'banner'}
                                        ></img>
                                    </div>
                                </ImageBox>
                            );
                        })}
                    </Slider>
                    <SliderPrevArrow
                        type="button"
                        onClick={() => sliderRef?.current?.slickPrev()}
                    >
                        <img
                            className='icon'
                            src='/assets/icon/arrow_left_white.svg'
                            alt='left arrow'
                        ></img>
                    </SliderPrevArrow>
                    <SliderNextArrow
                        type="button"
                        onClick={() => sliderRef?.current?.slickNext()}
                    >
                        <img
                            className='icon'
                            src='/assets/icon/arrow_right_white.svg'
                            alt='right arrow'
                        ></img>
                    </SliderNextArrow>
                    <SliderNumbering>
                        {sliderIndex.activeSlide2 + 1} | {banners.length}
                    </SliderNumbering>
                </div>
            </Container>
        </>
    );
}

export default BannerFieldComponent;