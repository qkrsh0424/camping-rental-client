import { useCallback, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { itemDataConnect } from '../../data_connect/itemDataConnect';
import BodyComponent from './BodyComponent';
import { categoryDataConnect } from '../../data_connect/categoryDataConnect';
import { handlingAreaDataConnect } from '../../data_connect/handlingAreaDataConnect';
import { fileDataConnect } from '../../data_connect/fileDataConnect';

const Container = styled.div`

`;

const initialCategoryListState = null;
const initialItemState = null;
const initialHandlingAreaListState = null;
const initialUploadedFileState = null;

const categoryListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const itemStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const handlingAreaListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const uploadedFileStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const itemId = query.itemId;

    const [categoryListState, dispatchCategoryListState] = useReducer(categoryListStateReducer, initialCategoryListState);
    const [itemState, dispatchItemState] = useReducer(itemStateReducer, initialItemState);
    const [handlingAreaListState, dispatchHandlingAreaListState] = useReducer(handlingAreaListStateReducer, initialHandlingAreaListState);
    const [uploadedFileState, dispatchUploadedFileState] = useReducer(uploadedFileStateReducer, initialUploadedFileState);

    const __searchCategoryList = useCallback(async () => {
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
    }, []);

    const __searchItemOne = useCallback(async () => {
        let params = {
            id: itemId
        }
        await itemDataConnect().searchOne(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchItemState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    });
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    }, [itemId]);

    const __searchHandlingAreaList = useCallback(async () => {
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
    }, []);

    const __uploadImageToS3 = async (params) => {
        await fileDataConnect().uploadImageToS3(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchUploadedFileState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err.response)
                alert(err.response?.data?.memo)
            })
    }

    const __updateItem = async (params) => {
        await itemDataConnect().updateOne(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    alert('업데이트 되었습니다.');
                    window.location.reload();
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error');
                    return;
                }

                alert(res?.data?.memo);
            })
    }

    useEffect(() => {
        __searchCategoryList();
        __searchItemOne();
        __searchHandlingAreaList();
    }, [__searchCategoryList, __searchItemOne, __searchHandlingAreaList]);

    const _onFileUpload = async (formData) => {
        await __uploadImageToS3(formData);
    }

    const _onClearUploadedFileState = () => {
        dispatchUploadedFileState({
            type: 'CLEAR'
        })
    }

    const _onSubmit = async (params) => {
        await __updateItem(params);
    }
    return (
        <>
            <Container>
                <BodyComponent
                    itemState={itemState}
                    categoryListState={categoryListState}
                    handlingAreaListState={handlingAreaListState}
                    uploadedFileState={uploadedFileState}

                    _onFileUpload={(formData) => _onFileUpload(formData)}
                    _onClearUploadedFileState={() => _onClearUploadedFileState()}
                    _onSubmit={(params) => _onSubmit(params)}
                ></BodyComponent>
            </Container>
        </>
    );
}
export default MainComponent;