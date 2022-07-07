import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { productDataConnect } from '../../data_connect/productDataConnect';
import { useCustomRouterHook } from '../../hooks/router/useCustomRouterHook';
import { numberFormatHandler } from '../../utils/numberFormatHandler';
import SingleBlockButton from '../module/button/SingleBlockButton';
import InfoLayout from './layout/InfoLayout';
import Slider from 'react-slick';
import ImageFieldComponent from './image-field/ImageField.component';
import InfoFieldComponent from './info-field/InfoField.component';
import LineBreakerBottom from '../module/fragment/LineBreakerBottom';
import FloatCartMainComponent from '../float-cart';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 150px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();
    const [product, dispatchProduct] = useReducer(productReducer, initialProduct);

    useEffect(() => {
        __product.req.fetch();

    }, [customRouter.location]);

    const __product = {
        req: {
            fetch: async () => {
                const productId = customRouter.query.productId || null;

                await productDataConnect().searchOneById({ productId: productId })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchProduct({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            }
        }
    }

    if (!product) {
        return null;
    }

    return (
        <>
            <Container>
                <InfoLayout>
                    <ImageFieldComponent
                        images={product.productImages}
                        product={product}
                    />
                    <InfoFieldComponent
                        product={product}
                    />
                </InfoLayout>
            </Container>
            <FloatCartMainComponent />
        </>
    );
}

const initialProduct = null;

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProduct;
        default: return initialProduct;
    }
}