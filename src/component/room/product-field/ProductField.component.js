import ItemCardComponent from "../../common/ItemCardComponent";
import styled from 'styled-components';
import ProductCardComponent from "../../common/ProductCardComponent";
import useKakaoPostcodeHook from "../../../hooks/kakao/useKakaoPostcodeHook";

const Container = styled.div`
    margin-top: 50px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
`;

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    @media all and (max-width:992px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ItemBox = styled.div`
    padding: 10px;
    @media all and (max-width:992px){
        border-bottom: 1px solid #e0e0e0;
    }
`;

export default function ProductFieldComponent(props) {
    const {
        open: kakaoPostcodeOpen
    } = useKakaoPostcodeHook();

    return (
        <>
            <button onClick={kakaoPostcodeOpen}>hello</button>
            <Container>
                <ItemWrapper>
                    {props.items?.map(r => {
                        return (
                            <ItemBox>
                                <ProductCardComponent
                                    title={r.name}
                                    // description={r.description}
                                    imageUrl={r.thumbnailFullUri}
                                    rentalRegions={r.rentalRegions}
                                    returnRegions={r.returnRegions}
                                    price={r.price}
                                    discountRate={r.discountRate}

                                // _onAddCartModalOpen={() => _onAddCartModalOpen(r.id)}
                                ></ProductCardComponent>
                            </ItemBox>
                        );
                    })}
                    {props.items?.map(r => {
                        return (
                            <ItemBox>
                                <ItemCardComponent
                                    title={r.name}
                                    // description={r.description}
                                    imageUrl={r.thumbnailFullUri}
                                    rentalRegions={r.rentalRegions}
                                    returnRegions={r.returnRegions}
                                    price={r.price}
                                    discountRate={r.discountRate}

                                // _onAddCartModalOpen={() => _onAddCartModalOpen(r.id)}
                                ></ItemCardComponent>
                            </ItemBox>
                        );
                    })}
                </ItemWrapper>
            </Container>
        </>
    );
}