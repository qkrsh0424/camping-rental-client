import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import useKakaoPostcodeHook from '../../../../hooks/kakao/useKakaoPostcodeHook';
import valueUtils from '../../../../utils/valueUtils';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ConfirmModalComponent from '../../../module/modal/ConfirmModalComponent';
import { AddAndModifyModalWrapper, Container, HeadWrapper, RegionListWrapper, Wrapper } from './RegionsField.styled';

export default function RegionsFieldComponent(props) {
    const [selectedRegion, dispatchSelectedRegion] = useReducer(selectedRegionReducer, initialSelectedRegion);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [modifyModalOpen, setModifyModalOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 500);

        return () => clearTimeout(timeout);

    }, [disabledBtn]);

    const __region = {
        action: {
            openAddModal: () => {
                setAddModalOpen(true);
            },
            closeAddModal: () => {
                setAddModalOpen(false);
            },
            openModifyModal: (region) => {
                dispatchSelectedRegion({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(region)
                })
                setModifyModalOpen(true);
            },
            closeModifyModal: () => {
                setModifyModalOpen(false);
                dispatchSelectedRegion({
                    type: 'CLEAR'
                })
            },
            openDeleteConfirmModal: (region) => {
                dispatchSelectedRegion({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(region)
                })
                setDeleteConfirmModalOpen(true);
            },
            closeDeleteConfirmModal: () => {
                setDeleteConfirmModalOpen(false);
                dispatchSelectedRegion({
                    type: 'CLEAR'
                })
            }
        },
        submit: {
            addConfirm: (body) => {
                setDisabledBtn(true);
                props.onSubmitAdd(body);

                __region.action.closeAddModal();
            },
            modifyConfirm: (body) => {
                setDisabledBtn(true);
                props.onSubmitModify(body);

                __region.action.closeModifyModal();
            },
            deleteConfirm: () => {
                setDisabledBtn(true);
                props.onSubmitDelete(selectedRegion);
                __region.action.closeDeleteConfirmModal();
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Head
                        onActionOpenAddModal={__region.action.openAddModal}
                    />
                    {valueUtils.isEmptyValues(props.regions) &&
                        <div
                            style={{
                                textAlign: 'center',
                                margin: '100px 0',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            현재 설정된 장소가 없습니다.
                        </div>
                    }
                    <RegionList
                        regions={props.regions}
                        onActionOpenDeleteConfirmModal={__region.action.openDeleteConfirmModal}
                        onActionOpenModifyModal={__region.action.openModifyModal}
                        disabledBtn={disabledBtn}
                    />
                </Wrapper>
            </Container>

            {addModalOpen &&
                <CommonModalComponent
                    open={addModalOpen}
                    onClose={__region.action.closeAddModal}
                >
                    <AddModal
                        onActionCloseAddModal={__region.action.closeAddModal}
                        onSubmitAddConfirm={__region.submit.addConfirm}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }

            {modifyModalOpen && selectedRegion &&
                <CommonModalComponent
                    open={modifyModalOpen}
                    onClose={__region.action.closeModifyModal}
                >
                    <ModifyModal
                        selectedRegion={selectedRegion}
                        onActionCloseModifyModal={__region.action.closeModifyModal}
                        onSubmitModifyConfirm={__region.submit.modifyConfirm}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }

            {deleteConfirmModalOpen &&
                <ConfirmModalComponent
                    open={deleteConfirmModalOpen}
                    onClose={__region.action.closeDeleteConfirmModal}
                    message={'해당 장소를 삭제하시겠습니까?'}
                    onConfirm={__region.submit.deleteConfirm}
                />
            }
        </>
    );
}

const initialRegion = {
    sido: '',
    sigungu: '',
    jibunAddress: '',
    roadAddress: '',
    buildingName: '',
    address: '',
    addressDetail: '',
};

const initialSelectedRegion = null;

const regionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRegion;
        default: return initialRegion;
    }
}

const selectedRegionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedRegion;
        default: return initialSelectedRegion;
    }
}

function Head({
    onActionOpenAddModal
}) {
    return (
        <HeadWrapper>
            <div className='title'>
                픽업|반납 장소 설정
            </div>
            <SingleBlockButton
                type='button'
                className='add-button'
                onClick={onActionOpenAddModal}
            >
                추가
            </SingleBlockButton>
        </HeadWrapper>
    );
}

function RegionList({
    regions,
    onActionOpenDeleteConfirmModal,
    onActionOpenModifyModal,
    disabledBtn
}) {
    return (
        <RegionListWrapper>
            {regions.map(r => {
                return (
                    <div
                        key={r.id}
                        className='region-box'
                    >
                        <div
                            className='region-content'
                        >
                            <span>시/도 : {r.sido}</span>
                            <span style={{ marginLeft: '20px' }}>시/군/구 : {r.sigungu}</span>
                        </div>
                        <div
                            className='region-content'
                            style={{
                                marginTop: '10px'
                            }}
                        >
                            {r.fullAddress}
                        </div>
                        <div
                            className='region-button-wrapper'
                        >
                            <SingleBlockButton
                                type='button'
                                className='region-button'
                                onClick={() => onActionOpenModifyModal(r)}
                            >
                                수정
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='region-button'
                                style={{
                                    color: '#e56767'
                                }}
                                onClick={() => onActionOpenDeleteConfirmModal(r)}
                                disabled={disabledBtn}
                            >
                                삭제
                            </SingleBlockButton>
                        </div>
                    </div>
                );
            })}
        </RegionListWrapper>
    );
}

function AddModal({
    onActionCloseAddModal,
    onSubmitAddConfirm,
    disabledBtn
}) {
    const [region, dispatchRegion] = useReducer(regionReducer, initialRegion);

    const {
        open: onActionOpenKakaoPostcode
    } = useKakaoPostcodeHook();

    const __handle = {
        action: {
            openPostcode: () => {
                onActionOpenKakaoPostcode({
                    callback: __handle.action.postcodeSelected
                });
            },
            postcodeSelected: (data) => {
                dispatchRegion({
                    type: 'SET_DATA',
                    payload: {
                        ...region,
                        sido: data.sido,
                        sigungu: data.sigungu,
                        jibunAddress: data.jibunAddress,
                        roadAddress: data.roadAddress,
                        buildingName: data.buildingName,
                        address: data.address,
                    }
                })
            }
        },
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchRegion({
                    type: 'SET_DATA',
                    payload: {
                        ...region,
                        [name]: value
                    }
                })
            }
        },
        submit: {
            confirm: () => {
                if (!region.sido || !region.sigungu || !region.address) {
                    alert('장소를 입력해 주세요.');
                    return;
                }

                onSubmitAddConfirm(region);
            }
        }
    }
    return (
        <AddAndModifyModalWrapper>
            <div className='input-box'>
                <div className='input-label'>장소</div>
                <input
                    type='text'
                    className='input-item'
                    value={region.address}
                    readOnly
                    onClick={__handle.action.openPostcode}
                ></input>
            </div>
            <div
                className='input-box'
            >
                <div className='input-label'>장소 상세</div>
                <input
                    type='text'
                    className='input-item'
                    name='addressDetail'
                    value={region.addressDetail || ''}
                    onChange={__handle.change.valueOfName}
                ></input>
            </div>
            <div className='button-box'>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={onActionCloseAddModal}
                >
                    취소
                </SingleBlockButton>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        color: '#2c73d2',
                        fontWeight: '600'
                    }}
                    onClick={__handle.submit.confirm}
                    disabled={disabledBtn}
                >
                    추가
                </SingleBlockButton>
            </div>
        </AddAndModifyModalWrapper>
    );
}

function ModifyModal({
    selectedRegion,
    onActionCloseModifyModal,
    onSubmitModifyConfirm,
    disabledBtn
}) {
    const [region, dispatchRegion] = useReducer(regionReducer, initialRegion);

    const {
        open: onActionOpenKakaoPostcode
    } = useKakaoPostcodeHook();

    useEffect(() => {
        dispatchRegion({
            type: 'SET_DATA',
            payload: selectedRegion
        })
    }, []);

    const __handle = {
        action: {
            openPostcode: () => {
                onActionOpenKakaoPostcode({
                    callback: __handle.action.postcodeSelected
                });
            },
            postcodeSelected: (data) => {
                dispatchRegion({
                    type: 'SET_DATA',
                    payload: {
                        ...region,
                        sido: data.sido,
                        sigungu: data.sigungu,
                        jibunAddress: data.jibunAddress,
                        roadAddress: data.roadAddress,
                        buildingName: data.buildingName,
                        address: data.address,
                    }
                })
            }
        },
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchRegion({
                    type: 'SET_DATA',
                    payload: {
                        ...region,
                        [name]: value
                    }
                })
            }
        },
        submit: {
            confirm: () => {
                if (!region.sido || !region.sigungu || !region.address) {
                    alert('장소를 입력해 주세요.');
                    return;
                }

                onSubmitModifyConfirm(region);
            }
        }
    }
    return (
        <AddAndModifyModalWrapper>
            <div className='input-box'>
                <div className='input-label'>장소</div>
                <input
                    type='text'
                    className='input-item'
                    value={region.address}
                    readOnly
                    onClick={__handle.action.openPostcode}
                ></input>
            </div>
            <div
                className='input-box'
            >
                <div className='input-label'>장소 상세</div>
                <input
                    type='text'
                    className='input-item'
                    name='addressDetail'
                    value={region.addressDetail || ''}
                    onChange={__handle.change.valueOfName}
                ></input>
            </div>
            <div className='button-box'>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={onActionCloseModifyModal}
                >
                    취소
                </SingleBlockButton>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        color: '#2c73d2',
                        fontWeight: '600'
                    }}
                    onClick={__handle.submit.confirm}
                    disabled={disabledBtn}
                >
                    수정
                </SingleBlockButton>
            </div>
        </AddAndModifyModalWrapper>
    );
}