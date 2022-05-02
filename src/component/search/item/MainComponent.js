import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'query-string';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { itemDataConnect } from '../../../data_connect/itemDataConnect';
import AccessInfoComponent from './AccessInfoComponent';
import BodyComponent from './BodyComponent';
import { categoryDataConnect } from '../../../data_connect/categoryDataConnect';
import CategoryListComponent from './CategoryListComponent';
import CommonModalComponent from '../../common/CommonModalComponent';
import DeleteItemModalComponent from './DeleteItemModalComponent';
import DisplayChangeModalComponent from './DisplayChangeModalComponent'

const Container = styled.div`

`;

const initialCategoryListState = null;
const initialItemListState = null;
const initialSelectedItemState = null;

const categoryListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const itemListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return null;
    }
}

const selectedItemStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return null;
    }
}

const MainComponent = (props) => {
    const location = useLocation();
    const query = qs.parse(location.search);
    const categoryId = query.categoryId;

    const [categoryListState, dispatchCategoryListState] = useReducer(categoryListStateReducer, initialCategoryListState);
    const [itemListState, dispatchItemListState] = useReducer(itemListStateReducer, initialItemListState);
    const [selectedItemState, dispatchSelectedItemState] = useReducer(selectedItemStateReducer, initialSelectedItemState);

    const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
    const [displayChangeModalOpen, setDisplayChangeModalOpen] = useState(false);

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

    const __searchItemList = useCallback(async () => {
        let params = {
            categoryId: categoryId
        }

        await itemDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    dispatchItemListState({
                        type: 'INIT_DATA',
                        payload: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [categoryId]);

    const __deleteItemOne = useCallback(async (params) => {
        await itemDataConnect().deleteItemOne(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    alert('삭제되었습니다.');
                    return;
                }
            })
            .catch(err => {
                console.log(err.response);
                if (err.response?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(err.response?.data?.memo);
            })
    }, []);

    const __updateItemOne = async (params) => {
        await itemDataConnect().updateOne(params)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    return;
                }
            })
            .catch(err => {
                let res = err.response;

                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    useEffect(() => {
        __searchCategoryList();
        __searchItemList();
    }, [__searchCategoryList, __searchItemList])

    const _onDeleteItemModalOpen = (itemState) => {
        setDeleteItemModalOpen(true);
        dispatchSelectedItemState({
            type: 'SET_DATA',
            payload: itemState
        })
    }

    const _onDeleteItemModalClose = () => {
        setDeleteItemModalOpen(false);
        dispatchSelectedItemState({
            type: 'CLEAR'
        })
    }

    const _onDeleteItemSubmit = async (params) => {
        await __deleteItemOne(params);
        await __searchItemList();
        _onDeleteItemModalClose();
    }

    const _onDisplayChangeModalOpen = (itemState) => {
        setDisplayChangeModalOpen(true);
        dispatchSelectedItemState({
            type: 'SET_DATA',
            payload: itemState
        })
    }

    const _onDisplayChangeModalClose = () => {
        setDisplayChangeModalOpen(false);
        dispatchSelectedItemState({
            type: 'CLEAR'
        })
    }

    const _onDisplayChangeSubmit = async (params) => {
        await __updateItemOne(params);
        await __searchItemList();
        _onDisplayChangeModalClose();
    }

    return (
        <>
            <Container>
                <CategoryListComponent
                    categoryListState={categoryListState}
                ></CategoryListComponent>
                <BodyComponent
                    itemListState={itemListState}

                    _onDeleteItemModalOpen={(itemState) => _onDeleteItemModalOpen(itemState)}
                    _onDisplayChangeModalOpen={(itemState) => _onDisplayChangeModalOpen(itemState)}
                ></BodyComponent>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={deleteItemModalOpen}

                onClose={() => _onDeleteItemModalClose()}
            >
                <DeleteItemModalComponent
                    selectedItemState={selectedItemState}

                    _onDeleteItemSubmit={(params) => _onDeleteItemSubmit(params)}
                ></DeleteItemModalComponent>
            </CommonModalComponent>

            <CommonModalComponent
                open={displayChangeModalOpen}

                onClose={() => _onDisplayChangeModalClose()}
            >
                <DisplayChangeModalComponent
                    selectedItemState={selectedItemState}

                    _onSubmit={(params) => _onDisplayChangeSubmit(params)}
                ></DisplayChangeModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default MainComponent;