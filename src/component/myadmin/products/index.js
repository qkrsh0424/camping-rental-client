import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../../data_connect/productDataConnect";
import { useCustomRouterHook } from "../../../hooks/router/useCustomRouterHook";
import PrivateField from "../../module/field/PrivateField";
import PagenationComponent from "../../module/pagenation/PagenationComponent";
import NavbarComponent from "../navbar/Navbar.component";
import CategoryFieldComponent from './category-field/CategoryField.component';
import ControlFieldComponent from "./control-field/ControlField.component";
import ProductListFieldComponent from "./product-list-field/ProductListField.component";

export default function MainComponent(props) {
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();
    const [allCategories, dispatchAllCategories] = useReducer(allCategoriesReducer, initialAllCategories);
    const [categories, dispatchCategories] = useReducer(categoriesReducer, initialCategories);
    const [productPage, dispatchProductPage] = useReducer(productPageRedcuer, initialProductPage);


    useEffect(() => {
        if (!customRouter.isReady || userRdx.isLoading || !userRdx.userInfo) {
            return;
        }

        __allCategories.req.fetch();
        __categories.req.fetch();
        __products.req.fetch();
    }, [customRouter.isReady, userRdx]);

    const __allCategories = {
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
                        console.log(err, err.response);
                    })
            }
        }
    }

    const __categories = {
        req: {
            fetch: async () => {
                const roomId = userRdx.userInfo.roomId;

                await productCategoryDataConnect().searchListByRoom({ roomId: roomId })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchCategories({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        dispatchCategories({
                            type: 'CLEAR'
                        })
                    })
                    ;
            }
        }
    }

    const __products = {
        req: {
            fetch: async () => {
                const roomId = userRdx.userInfo.roomId;
                const categoryId = customRouter.query.categoryId || null;
                const page = customRouter.query.page || null;
                const size = customRouter.query.size || null;

                let params = {
                    roomId: roomId,
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
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
                    ;
            },
            create: async (body) => {
                let roomId = userRdx.userInfo.roomId;

                await productDataConnect().createOne({
                    roomId: roomId,
                    body: body
                })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error');
                            return;
                        }

                        alert(res.data.memo);
                    })
                    ;
            },
            changeDisplayYn: async (body) => {
                let productId = body.id;
                let displayYn = body.displayYn;

                await productDataConnect().changeDisplayYn({ productId: productId, displayYn: displayYn })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error');
                            return;
                        }

                        alert(res.data.memo);
                    })
                    ;
            },
            delete: async (body) => {
                let productId = body.id;

                await productDataConnect().deleteOne({ productId: productId })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error');
                            return;
                        }

                        alert(res.data.memo);
                    })
                    ;
            },
            update: async (body) => {
                let productId = body.id;

                await productDataConnect().updateOne({ productId: productId, body: body })
                    .catch(err => {
                        let res = err.response;

                        if (!res) {
                            alert('네트워크 연결이 원활하지 않습니다.');
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error');
                            return;
                        }

                        alert(res.data.memo);
                    })
                    ;
            }
        },
        submit: {
            add: async (body) => {
                await __products.req.create(body);
                await __products.req.fetch();
            },
            changeDisplayYn: async (body) => {
                await __products.req.changeDisplayYn(body);
                await __products.req.fetch();
            },
            delete: async (body) => {
                await __products.req.delete(body);
                await __products.req.fetch();
            },
            modify: async (body) => {
                await __products.req.update(body);
                await __products.req.fetch();
            }
        }
    }

    return (
        <>
            <NavbarComponent />
            <PrivateField>
                <ControlFieldComponent
                    allCategories={allCategories}
                    onSubmitAddProduct={__products.submit.add}
                />
                <CategoryFieldComponent
                    categories={categories}
                />
                <ProductListFieldComponent
                    products={productPage?.content || []}
                    allCategories={allCategories}
                    onSubmitChangeDisplayYn={__products.submit.changeDisplayYn}
                    onSubmitDelete={__products.submit.delete}
                    onSubmitModify={__products.submit.modify}
                />
                {productPage &&
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
                }
            </PrivateField>
        </>
    );
}

const initialCategories = [];
const initialAllCategories = [];
const initialProductPage = null;

const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialCategories;
        default: return initialCategories;
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

const productPageRedcuer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProductPage;
        default: return initialProductPage;
    }
}