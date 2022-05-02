import axios from 'axios';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { categoryDataConnect } from '../../data_connect/categoryDataConnect';
import { fileDataConnect } from '../../data_connect/fileDataConnect';
import { handlingAreaDataConnect } from '../../data_connect/handlingAreaDataConnect';
import { itemDataConnect } from '../../data_connect/itemDataConnect';
import BodyComponent from './BodyComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialCategoryListState = null;
const initialHandlingAreaListState = null;
const initialImageListState = null

const categoryListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const handlingAreaListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const imageListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state };
    }
}

const MainComponent = (props) => {
    const [categoryListState, dispatchCategoryListState] = useReducer(categoryListStateReducer, initialCategoryListState);
    const [handlingAreaListState, dispatchHandlingAreaListState] = useReducer(handlingAreaListStateReducer, initialHandlingAreaListState);
    const [imageListState, dispatchImageListState] = useReducer(imageListStateReducer, initialImageListState);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().searchCategoryList();
            __handleDataConnect().searchHandlingAreaList();
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchCategoryList: async function () {
                await categoryDataConnect().searchAll()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchCategoryListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            },
            searchHandlingAreaList: async function () {
                await handlingAreaDataConnect().searchAll()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchHandlingAreaListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            },
            uploadImageToS3: async function (params) {
                await fileDataConnect().uploadImageToS3(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchImageListState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                        alert(err.response?.data?.memo)
                    })
            },
            createItem: async function (params) {
                await itemDataConnect().createOne(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            alert('상품 등록 되었습니다.');
                            window.location.reload();
                            return;
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            _onFileUpload: async function (params) {
                await __handleDataConnect().uploadImageToS3(params);
            },
            _onSubmit: async function (params) {
                await __handleDataConnect().createItem(params);
            }
        }
    }

    return (
        <>
            <Container>
                <BodyComponent
                    categoryListState={categoryListState}
                    handlingAreaListState={handlingAreaListState}
                    imageListState={imageListState}

                    _onFileUpload={(params) => __handleEventControl()._onFileUpload(params)}
                    _onSubmit={(params) => __handleEventControl()._onSubmit(params)}
                ></BodyComponent>
            </Container>
        </>
    );
}
export default MainComponent;