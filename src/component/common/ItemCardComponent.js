import React from 'react';
import styled from "styled-components";
import { numberFormatHandler } from '../../utils/numberFormatHandler';

const Container = styled.div`
    position: relative;
    & .header{
        font-size: 13px;
        color:#9352bd
    }

    & .title{
        font-size: 16px;
        font-weight: 500;
        /* 글자가 라인 두줄 범위 넘어가면 ...처리 */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* 글자가 라인 두줄 범위 넘어가면 ...처리 */
    }

    .description{
        margin-top: 10px;
        font-size: 13px;
        font-weight: 500;
        color: #444;

    }

    & .important{
        font-weight: 700;
        font-size: 16px;
        color:#777;
    }

    & .important .dday{
        color:#33f983;
    }

    & .price-info-box{
        margin-top: 10px;
        font-size: 12px;
        color:#dd7140;
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical; */
    }

    .rental-region-box{
        margin-top: 10px;
        font-size: 12px;
        color: #07af8c;
        font-weight: 600;
    }

    .return-region-box{
        margin-top: 10px;
        font-size: 12px;
        color: #07af8c;
        font-weight: 600;
    }

    & .apply{
        font-size: 14px;
    }

    & .bold-600{
        font-weight: 600;
    }

    & .margin-left-6{
        margin-left: 6px;
    }

    & .margin-right-6{
        margin-right:6px;
    }

    @media only screen and (max-width: 992px){
        & .header{
            font-size: 12px;
            color:#9352bd
        }
        & .title{
            font-size: 13px;
        }
        & .important{
            font-size: 12px;
        }
        & .price-info-box{
            font-size: 11px;
        }
        & .apply{
            font-size: 11px;
        }
    }
`;

const Wrapper = styled.div`
    background:white;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    width:100%;
    height:auto;
    border-radius: 5px;
    overflow: hidden;
`;

const ImageBox = styled.div`
    position: relative;
    padding-bottom: 100%; // 1:1
`;

const ImageEl = styled.img`
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: .5s;

    ${Container}:hover &{
        transform: scale(1.05);
    }
`;

const ContentContainer = styled.div`
    padding:5px 0;
`;

const ContentWrapper = styled.div`
    padding-bottom: 4px;
`;

const AddCartButton = styled.button`
    width: 100%;
    margin-top: 10px;
    background: white;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 5px;

    font-weight: 600;
    cursor: pointer;
    &:hover{
        background: #e1e1e160;
    }
`;
const ItemCardComponent = (props) => {

    return (
        <>
            <Container>
                <Wrapper>
                    <ImageWrapper>
                        <ImageBox>
                            <ImageEl src={props.imageUrl} loading='lazy'></ImageEl>
                        </ImageBox>
                    </ImageWrapper>
                    <ContentContainer>
                        <ContentWrapper>
                            <div className='title'>{props.title}</div>
                            <div className='description'>{props.description}</div>
                            <div className='price-info-box'>
                                <div>

                                    <span className='bold-600'>1박당 가격 : </span>
                                    <span className='bold-600'>{numberFormatHandler().numberWithCommas(props.price || 0)} 원</span>
                                </div>
                                <div>
                                    <span className='bold-600'>연박시 할인율 : </span>
                                    <span className='bold-600'>{props.discountRate} %</span>
                                </div>
                                <div>
                                    <span className='bold-600'>할인 적용 2박 가격 : </span>
                                    <span className='bold-600'>{numberFormatHandler().numberWithCommas(((props.price * 2) * ((100 - props.discountRate) / 100)) || 0)} 원</span>
                                </div>
                            </div>
                            <div className='rental-region-box'>
                                <div>[픽업 가능 장소]</div>
                                {/* <div>{props.rentalRegions}</div> */}
                                {props.rentalRegions.split(',').map((r, index) => {
                                    return (
                                        <div key={index}>{r}</div>
                                    )
                                })}
                            </div>
                            <div className='rental-region-box'>
                                <div>[반납 가능 장소]</div>
                                {/* <div>{props.returnRegions}</div> */}
                                {props.returnRegions.split(',').map((r, index) => {
                                    return (
                                        <div key={index}>{r}</div>
                                    )
                                })}
                            </div>
                            <AddCartButton type='button' onClick={() => props._onAddCartModalOpen()}>장바구니에 담기</AddCartButton>
                        </ContentWrapper>
                        <ContentWrapper className='clearfix'>

                        </ContentWrapper>
                    </ContentContainer>
                </Wrapper>
            </Container>
        </>
    );
}

export default ItemCardComponent;