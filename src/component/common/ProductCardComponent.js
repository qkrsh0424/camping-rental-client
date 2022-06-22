import styled from 'styled-components';
import { numberFormatHandler } from '../../utils/numberFormatHandler';
import Ripple from '../module/button/Ripple';

const Container = styled.div`

`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 992px){
        flex-direction: row;
    }
`;

const ImageBox = styled.div`
    width:100%;
    height: auto;
    border-radius: 5px;
    overflow: hidden;

    @media all and (max-width: 992px){
        width:100px;
        height: 100px;
    }
`;

const ImageFigure = styled.div`
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

const ContentWrapper = styled.div`
    margin-top: 10px;
    @media all and (max-width: 992px){
        flex:1;
        margin-left: 10px;
    }

    .title{
        font-size: 16px;
        font-weight: 500;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .price{
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .regions{
        font-size: 12px;
        line-height: 1.5;
        margin-top: 10px;
        color:#505050;

        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 11px;
        }
    }
`;

const AddCartButton = styled.button`
    user-select: none;
    padding: 0;
    margin: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    position: relative;
    background: white;
    border: 1px solid #e0e0e0;
    cursor:pointer;
    overflow: hidden;

    .icon{
        width:20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:active{
        border-style: outset;
        outline: none;

    }
`;

const regions = [
    '서울특별시 마포구 상수동 312-6 3층',
    '인천광역시 서구 건지로 250번길 53 2층 201호',
    '서울특별시 영등포구 양펑동 3가 37-3 더라임오피스텔 1102호'
]
export default function ProductCardComponent(props) {
    return (
        <>
            <Wrapper>
                <ImageBox>
                    <ImageFigure>
                        <ImageEl src={props.imageUrl}></ImageEl>
                    </ImageFigure>
                </ImageBox>
                <ContentWrapper>
                    <div className='title'>{props.title}</div>
                    <div className='price'>1박 {numberFormatHandler().numberWithCommas(props.price || 0)} 원 | 연박 할인 {props.discountRate}%</div>
                    <div className='regions'>
                        <div>픽업 | 반납 장소</div>
                        {regions.slice(0, 2).map(r => {
                            return (
                                <div>{r}</div>
                            );
                        })}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '10px'
                        }}
                    >
                        <AddCartButton
                            style={{
                                padding: 0,
                                margin: 0,
                                width: 34,
                                height: 34,
                                borderRadius: '50%',
                                position: 'relative',
                                background: 'white',
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            <img
                                className='icon'
                                src='/assets/icon/add_cart_gray.svg'
                                alt={'add cart'}
                            ></img>
                            <Ripple color={'#e0e0e0'} duration={1000} />
                        </AddCartButton>
                    </div>
                </ContentWrapper>
            </Wrapper>
        </>
    );
}