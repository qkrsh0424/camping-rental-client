import { useEffect, useReducer } from "react";
import { productCategoryDataConnect } from "../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../data_connect/productDataConnect";
import { useCustomRouterHook } from "../../hooks/router/useCustomRouterHook";
import FloatCartMainComponent from "../float-cart";
import PagenationComponent from "../module/pagenation/PagenationComponent";
import BannerFieldComponent from "./banner-field/BannerField.component";
import CategoryFieldComponent from "./category-field/CategoryField.component";
import ProductListFieldComponent from "./product-list-field/ProductListField.component";

export default function MainComponent(props) {
    const customRouter = useCustomRouterHook();
    const [productPage, dispatchProductPage] = useReducer(productPageReducer, initialProductPage);
    const [allCategories, dispatchAllCategories] = useReducer(allCategoriesReducer, initialAllCategories);

    useEffect(() => {

        __products.req.fetchPage();
        __categories.req.fetch();

    }, [customRouter.location]);

    const __products = {
        req: {
            fetchPage: async () => {
                let categoryId = customRouter.query.categoryId || null;
                let page = customRouter.query.page || null;
                let size = customRouter.query.size || null;

                let params = {
                    categoryId: categoryId,
                    page: page,
                    size: size
                }
                await productDataConnect().searchPage({ params: params })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchProductPage({
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

    const __categories = {
        req: {
            fetch: async () => {
                await productCategoryDataConnect().searchList()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchAllCategories({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        dispatchAllCategories({
                            type: 'CLEAR'
                        })
                    })
                    ;
            }
        }
    }

    return (
        <>
            <BannerFieldComponent />
            <CategoryFieldComponent
                categories={allCategories}
            />
            {productPage &&
                (
                    <>
                        <ProductListFieldComponent
                            allCategories={allCategories}
                            products={productPage?.content}
                        />
                        <PagenationComponent
                            style={{
                                marginTop: '40px',
                                marginBottom: '40px'
                            }}
                            isFirst={productPage.first}
                            isLast={productPage.last}
                            pageIndex={productPage.number}
                            sizeElements={[30, 50, 100]}
                            totalPages={productPage.totalPages}
                            totalElements={productPage.totalElements}
                            align={'center'}
                        />
                    </>
                )

            }
            <FloatCartMainComponent />
        </>
    );
}

const initialProductPage = null;
const initialAllCategories = [];

const productPageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductPage;
        default: return initialProductPage;
    }
}

const allCategoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialAllCategories;
        default: return initialAllCategories;
    }
}