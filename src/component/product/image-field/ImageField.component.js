import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div`
    .slider-wrapper{
        width: 430px;
        height: 430px;
        box-sizing: border-box;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        overflow: hidden;
        line-height: 0;

        @media all and (max-width:992px){
            width: 100%;
            height: auto;
        }
    }

    .slick-dots{
        bottom:20px;
    }

    .slick-dots li.slick-active button:before {
        color:#b39283 !important;
        opacity: 1;
    }

    .slick-dots li button:before {
        color:#b39283 !important;
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

const MainImageWrapper = styled.div`
    width:100%;
    height:auto;
`;

const MainImageBox = styled.div`
    position: relative;
    padding-bottom: 100%; // 1:1
    
`;

const MainImageEl = styled.img`
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    
`;

const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export default function ImageFieldComponent(props) {
    return (
        <>
            <Container>
                <div
                    className='slider-wrapper'
                >
                    <Slider
                        {...settings}
                    >
                        {props.images?.map(r => {
                            return (
                                <MainImageWrapper key={r.id}>
                                    <MainImageBox>
                                        <MainImageEl
                                            src={r.fileFullUri}
                                        ></MainImageEl>
                                    </MainImageBox>
                                </MainImageWrapper>
                            );
                        })}
                    </Slider>
                </div>
            </Container>
        </>
    );
}