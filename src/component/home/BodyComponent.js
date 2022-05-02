import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import CommonModalComponent from '../common/CommonModalComponent';
import ItemCardComponent from '../common/ItemCardComponent';
import AddCartModalComponent from './AddCartModalComponent';
import CartButtonComponent from './CartButtonComponent';

const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 0;
    }
`;

const ItemWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media all and (max-width:992px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ItemBox = styled.div`
    padding: 10px;
`;

const initialSelectedItemState = null;

const selectedItemStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const BodyComponent = (props) => {
    const [selectedItemState, dispatchSelectedItemState] = useReducer(selectedItemStateReducer, initialSelectedItemState);

    const [addCartModalOpen, setAddCartModalOpen] = useState(false);

    const _onAddCartModalOpen = (itemId) => {
        let item = props.itemListState.filter(r => r.id === itemId)[0];
        dispatchSelectedItemState({
            type: 'SET_DATA',
            payload: item
        });

        setAddCartModalOpen(true);
    }

    const _onAddCartModalClose = () => {
        dispatchSelectedItemState({
            type: 'CLEAR'
        })
        setAddCartModalOpen(false);
    }

    const _onAddCartSubmit = (params) => {
        props._onAddCart(params);
        _onAddCartModalClose();
    }

    return (
        <>
            <Container>
                <ItemWrapper>
                    {props.itemListState?.map(r => {
                        return (
                            <ItemBox key={r.id}>
                                <ItemCardComponent
                                    title={r.name}
                                    description={r.description}
                                    imageUrl={r.thumbnailFullUri}
                                    rentalRegions={r.rentalRegions}
                                    returnRegions={r.returnRegions}
                                    price={r.price}
                                    discountRate={r.discountRate}

                                    _onAddCartModalOpen={() => _onAddCartModalOpen(r.id)}
                                ></ItemCardComponent>
                            </ItemBox>
                        );
                    })}
                </ItemWrapper>
            </Container>
            {/* Modal */}
            <CommonModalComponent
                open={addCartModalOpen}

                onClose={() => _onAddCartModalClose()}
            >
                <AddCartModalComponent
                    selectedItemState={selectedItemState}

                    _onAddCartModalClose={()=>_onAddCartModalClose()}
                    _onAddCartSubmit={(params) => _onAddCartSubmit(params)}
                ></AddCartModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default BodyComponent;