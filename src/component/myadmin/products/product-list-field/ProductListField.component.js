import _ from 'lodash';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { productDataConnect } from '../../../../data_connect/productDataConnect';
import { numberFormatHandler } from '../../../../utils/numberFormatHandler';
import valueUtils from '../../../../utils/valueUtils';
import Ripple from '../../../module/button/Ripple';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import CustomCheckbox from '../../../module/checkbox/CustomCheckbox';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import ConfirmModalComponent from '../../../module/modal/ConfirmModalComponent';
import CustomSelect from '../../../module/select/CustomSelect';
import { useImageFileUploaderHook } from '../../../module/uploader/useImageFileUploaderHook';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const ItemListWrapper = styled.div`

    display: flex;
    flex-wrap: wrap;
    align-items: stretch;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

const CardWrapper = styled.div`
    width:20%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;

    @media all and (max-width: 992px){
        width:100%;
        flex-direction: row;
        padding: 10px 0;
    }

    .image-box{
        width:100%;
        overflow: hidden;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width:100px;
            height: 100px;
        }
    }

    .image-figure{
        position: relative;
        padding-bottom: 100%; // 1:1
    }

    .image-el{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
    }

    .content-box{
        margin-top: 10px;
        @media all and (max-width: 992px){
            flex:1;
            margin-top: 0;
            margin-left: 10px;
        }
    }

    .content-box .content-title{
        font-size: 16px;
        font-weight: 500;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .content-box .content-price{
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .content-box .content-list{
        padding:0 20px;
        font-size: 13px;
        font-weight: 600;
        margin-top: 5px;
        color: #505050;
        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 12px;
        }
    }

    .content-box .content-regions{
        font-size: 12px;
        line-height: 1.5;
        margin-top: 10px;
        color:#505050;

        @media all and (max-width: 992px){
            margin-top: 5px;
            font-size: 11px;
        }
    }

    .content-box .content-category{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        font-size: 12px;
        color: #404040;
    }

    .control-button-box{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        .control-button-el:nth-last-child(1){
            margin-right: 0;
        }
    }

    .control-button-box .control-button-el{
        user-select: none;
        margin:0;
        padding:0;
        font-size: 13px;
        width:60px;
        height: 30px;
        border:none;
    }
`;

const ModifyModalWrapper = styled.div`
    padding:10px;

    .input-box{
        padding:20px 10px;
    }

    .input-label{
        font-size: 14px;
        font-weight: 500;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .input-item{
        box-sizing: border-box;
        width:100%;
        padding:10px;
        border:none;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 5px;
        font-size: 14px;

        @media all and (max-width:992px){
            font-size: 12px;
        }
        
        &:focus{
            outline:none;
            border-bottom: 1px solid #2c73d2;
        }

        &:read-only{
            cursor: pointer;
        }
    }

    .textarea-item{
        box-sizing: border-box;
        margin-top: 5px;
        padding:10px;
        width:100%;
        height: 200px;
        resize:none;
        font-size: 14px;
        border:none;
        border-bottom:1px solid #e0e0e0;

        @media all and (max-width:992px){
            font-size: 12px;
        }

        &:focus{
            outline:none;
            border: 1px solid #2c73d2;
        }

        &:read-only{
            cursor: pointer;
        }
    }

    .text-length-label{
        font-size: 12px;
        color:#505050;
    }

    .image-list-wrapper{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
    }

    .image-add-button-item{
        position: relative;
        overflow: hidden;
        width:80px;
        height: 80px;
        background: white;
        border:1px solid #e0e0e0;
        cursor: pointer;
    }

    .image-add-button-icon{
        width: 50px;
        height: 50px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }

    .image-box{
        position: relative;
        overflow: hidden;
        width:80px;
        height: 80px;
        background: white;
        border:1px solid #e0e0e0;
        box-sizing: border-box;
        /* cursor: pointer; */
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .image-box:hover>.image-item{
        -webkit-filter: grayscale(50%) blur(1px);
	    filter: grayscale(50%) blur(1px);
    }

    .image-box:hover>.image-delete-button{
        display: block;
    }

    .image-item{
        width:100%;
        height: 100%;
        object-fit: cover;
    }

    .image-delete-button{
        display: none;
        position:absolute;
        padding:0;
        margin:0;
        box-sizing: border-box;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:25px;
        height: 25px;
        border:1px solid #e56767;
        border-radius: 50%;
        background:white;
        cursor: pointer;
    }

    .image-delete-button-icon{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:25px;
        height: 25px;
    }

    .button-box{
        display: flex;
        margin-top: 20px;
    }

    .button-item{
        border:none;
        margin: 0;
        font-size: 14px;
    }
`;

export default function ProductListFieldComponent(props) {
    const [product, dispatchProduct] = useReducer(productReducer, initialProduct);
    const [displayOnConfirmModalOpen, setDisplayOnConfirmModalOpen] = useState(false);
    const [displayOffConfirmModalOpen, setDisplayOffConfirmModalOpen] = useState(false);
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [modifyModalOpen, setModifyModalOpen] = useState(false);

    const __product = {
        action: {
            openDisplayOnConfirmModal: (data) => {
                dispatchProduct({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(data)
                })
                setDisplayOnConfirmModalOpen(true);
            },
            closeDisplayOnConfirmModal: () => {
                setDisplayOnConfirmModalOpen(false);
                dispatchProduct({
                    type: 'CLEAR'
                })
            },
            openDisplayOffConfirmModal: (data) => {
                dispatchProduct({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(data)
                })
                setDisplayOffConfirmModalOpen(true);
            },
            closeDisplayOffConfirmModal: () => {
                setDisplayOffConfirmModalOpen(false);
                dispatchProduct({
                    type: 'CLEAR'
                })
            },
            openDeleteConfirmModal: (data) => {
                dispatchProduct({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(data)
                })
                setDeleteConfirmModalOpen(true);
            },
            closeDeleteConfirmModal: () => {
                setDeleteConfirmModalOpen(false);
                dispatchProduct({
                    type: 'CLEAR'
                })
            },
            openModifyModal: (data) => {
                dispatchProduct({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(data)
                })
                setModifyModalOpen(true);
            },
            closeModifyModal: () => {
                setModifyModalOpen(false);
                dispatchProduct({
                    type: 'CLEAR'
                })
            }
        },
        submit: {
            confirmDisplayOff: () => {
                let body = {
                    ...product,
                    displayYn: 'n'
                }
                props.onSubmitChangeDisplayYn(body);
                __product.action.closeDisplayOffConfirmModal();
            },
            confirmDisplayOn: () => {
                let body = {
                    ...product,
                    displayYn: 'y'
                }
                props.onSubmitChangeDisplayYn(body);
                __product.action.closeDisplayOnConfirmModal();
            },
            confirmDelete: () => {
                props.onSubmitDelete(product);
                __product.action.closeDeleteConfirmModal();
            },
            confirmModify: (body) => {
                props.onSubmitModify(body);
                __product.action.closeModifyModal();
            }
        }
    }

    return (
        <>
            <Container>
                <ItemListWrapper>
                    {props.products.map(product => {
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                allCategories={props.allCategories}
                                onActionOpenDisplayOnConfirmModal={__product.action.openDisplayOnConfirmModal}
                                onActionOpenDisplayOffConfirmModal={__product.action.openDisplayOffConfirmModal}
                                onActionOpenDeleteConfirmModal={__product.action.openDeleteConfirmModal}
                                onActionOpenModifyModal={__product.action.openModifyModal}
                            />
                        );
                    })}
                </ItemListWrapper>
            </Container>

            <ConfirmModalComponent
                open={displayOffConfirmModalOpen}
                onClose={__product.action.closeDisplayOffConfirmModal}
                message='해당 제품의 전시상태를 전시중지로 변경 하시겠습니까?'
                onConfirm={__product.submit.confirmDisplayOff}
            />

            <ConfirmModalComponent
                open={displayOnConfirmModalOpen}
                onClose={__product.action.closeDisplayOnConfirmModal}
                message='해당 제품의 전시상태를 전시중으로 변경 하시겠습니까?'
                onConfirm={__product.submit.confirmDisplayOn}
            />

            <ConfirmModalComponent
                open={deleteConfirmModalOpen}
                onClose={__product.action.closeDeleteConfirmModal}
                message='해당 제품을 정말로 삭제하시겠습니까?'
                onConfirm={__product.submit.confirmDelete}
            />

            <CommonModalComponent
                open={modifyModalOpen}
                onClose={__product.action.closeModifyModal}
            >
                <ModifyModal
                    allCategories={props.allCategories}
                    product={product}

                    onConfirm={__product.submit.confirmModify}
                />
            </CommonModalComponent>
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

function ProductCard({
    product,
    allCategories,
    onActionOpenDisplayOnConfirmModal,
    onActionOpenDisplayOffConfirmModal,
    onActionOpenDeleteConfirmModal,
    onActionOpenModifyModal
}) {
    return (
        <CardWrapper>
            <div className='image-box'>
                <div className='image-figure'>
                    <img
                        className='image-el'
                        src={product.thumbnailUri}
                        alt={'product thumbnail'}
                        loading={'lazy'}
                    ></img>
                </div>
            </div>
            <div className='content-box'>
                <div className='content-title'>{product.name}</div>
                <div className='content-price'>{numberFormatHandler().numberWithCommas(product.price || 0)} 원 (1시간)</div>
                <ul className='content-list'>
                    <li>
                        최소 대여 가능 시간 {product.minimumRentalHour}H
                    </li>
                    {product.discountYn === 'y' &&
                        <li>
                            {product.discountMinimumHour}H 이상 대여시 <span style={{ color: '#b39283' }}>{product.discountRate}% 할인</span>
                        </li>
                    }
                </ul>
                <div className='content-regions'>
                    <div>픽업 | 반납 장소</div>
                    {product.regions.slice(0, 3).map(r => {
                        return (
                            <div key={r.id}>{r.fullAddress}</div>
                        );
                    })}
                </div>
                <div
                    className='content-category'
                >
                    {allCategories.map(r => {
                        if (r.id === product.productCategoryId) {
                            return (
                                <div
                                    key={r.id}
                                >
                                    {r.name}
                                </div>
                            );
                        } else {
                            return (
                                <React.Fragment key={r.id}></React.Fragment>
                            );
                        }
                    })}
                </div>
                <div
                    className='control-button-box'
                >
                    {product.displayYn === 'y' &&
                        (
                            <SingleBlockButton
                                type='button'
                                className='control-button-el'
                                style={{
                                    color: 'white',
                                    background: '#5fcf80'
                                }}
                                onClick={() => onActionOpenDisplayOffConfirmModal(product)}
                            >
                                전시중
                            </SingleBlockButton>
                        )
                    }

                    {product.displayYn === 'n' &&
                        (
                            <SingleBlockButton
                                type='button'
                                className='control-button-el'
                                style={{
                                    color: 'white',
                                    background: 'red'
                                }}
                                onClick={() => onActionOpenDisplayOnConfirmModal(product)}
                            >
                                전시중지
                            </SingleBlockButton>
                        )
                    }
                    <SingleBlockButton
                        type='button'
                        className='control-button-el'
                        style={{
                            color: '#2c73d2'
                        }}
                        onClick={() => onActionOpenModifyModal(product)}
                    >
                        수정
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='control-button-el'
                        style={{
                            color: '#e56767'
                        }}
                        onClick={() => onActionOpenDeleteConfirmModal(product)}
                    >
                        삭제
                    </SingleBlockButton>
                </div>
            </div>
        </CardWrapper>
    );
}

function ModifyModal({
    product,
    allCategories,
    onConfirm
}) {
    const { __reqUploadImageFile } = useImageFileUploaderHook();
    const fileUploaderRef = useRef();
    const [modifyProduct, dispatchModifyProduct] = useReducer(modifyProductReducer, initialModifyProduct);

    useEffect(() => {
        if (!product) {
            return;
        }

        __modifyProduct.req.fetch();
    }, [product]);

    const __modifyProduct = {
        req: {
            fetch: async () => {
                await productDataConnect().searchOneById({ productId: product.id })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchModifyProduct({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                    })
            }
        },
        action: {
            openFileUploader: () => {
                if (modifyProduct.productImages.length >= 10) {
                    alert('이미지는 최대 10개 까지 등록 가능합니다.');
                    return;
                }
                fileUploaderRef.current.click();
            },
            deleteImage: (imageId) => {
                let newImages = [...modifyProduct.productImages.filter(r => r.id !== imageId)];

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        productImages: newImages
                    }
                })
            }
        },
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        [name]: value
                    }
                })
            },
            price: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberWithCommasOnlyFormat(value)) {
                    return;
                }

                value = value.replace(/,/g, '');

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        price: value
                    }
                })
            },
            discountRate: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberOnlyFormat(value) || value < 0 || value > 100) {
                    return;
                }

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        discountRate: value
                    }
                })
            },
            minimumRentalHour: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberOnlyFormat(value) || value < 0 || value > 10000) {
                    return;
                }

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        minimumRentalHour: value
                    }
                })
            },
            discountYn: (e) => {
                let checked = e.target.checked;

                let discountYn = checked ? 'y' : 'n';

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        discountYn: discountYn
                    }
                })
            },
            discountMinimumHour: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberOnlyFormat(value) || value < 0 || value > 10000) {
                    return;
                }

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        discountMinimumHour: value
                    }
                })
            },
            pushImage: async (e) => {
                e.preventDefault();

                if (modifyProduct.productImages.length >= 10) {
                    alert('이미지는 최대 10개 까지 등록 가능합니다.');
                    return;
                }

                // 파일을 선택하지 않은 경우
                if (e.target.files.length <= 0) return;

                let imageInfos = await __reqUploadImageFile(e);

                let images = [...modifyProduct.productImages];
                images = images.concat(imageInfos.map(r => {
                    return {
                        ...r,
                        productId: null
                    }
                }));

                dispatchModifyProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...modifyProduct,
                        productImages: images
                    }
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                if (modifyProduct.productImages.length <= 0 || modifyProduct.productImages.length > 10) {
                    alert('이미지는 1개 이상 10개 이하로 등록할 수 있습니다.');
                    return;
                }

                if (!modifyProduct.name) {
                    alert('제품명은 필수 입력입니다.')
                    return;
                }

                if (!modifyProduct.productCategoryId) {
                    alert('카테고리는 필수 선택입니다.')
                    return;
                }

                if (modifyProduct.price < 0 || modifyProduct.price > 1000000000) {
                    alert('가격을 정확하게 입력해주세요.');
                    return;
                }

                if (modifyProduct.minimumRentalHour <= 0) {
                    alert('최소 대여 가능 시간을 정확하게 입력해 주세요.');
                    return;
                }

                if (modifyProduct.discountYn === 'y') {
                    if (modifyProduct.discountMinimumHour <= 0 || modifyProduct.discountMinimumHour > 10000) {
                        alert('최소 할인 적용 시간을 정확하게 입력해 주세요.');
                        return;
                    }

                    if (modifyProduct.discountRate <= 0 || modifyProduct.discountRate > 100) {
                        alert('할인율을 정확하게 입력해 주세요.');
                        return;
                    }
                }

                let body = {
                    ...modifyProduct,
                    price: valueUtils.isEmptyNumbers(parseInt(modifyProduct.price)) ? 0 : parseInt(modifyProduct.price),
                    minimumRentalHour: valueUtils.isEmptyNumbers(parseInt(modifyProduct.minimumRentalHour)) ? 1 : parseInt(modifyProduct.minimumRentalHour),
                    discountMinimumHour: valueUtils.isEmptyNumbers(parseInt(modifyProduct.discountMinimumHour)) ? 0 : parseInt(modifyProduct.discountMinimumHour),
                    discountRate: valueUtils.isEmptyNumbers(parseInt(modifyProduct.discountRate)) ? 0 : parseInt(modifyProduct.discountRate)
                }

                onConfirm(body);
            }

        }
    }

    if (!modifyProduct) {
        return null;
    }

    return (
        <ModifyModalWrapper>
            <form onSubmit={__modifyProduct.submit.confirm}>
                <div
                    className='input-box'
                    style={{
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    <div className='input-label'>이미지({modifyProduct.productImages?.length} / 10)</div>
                    <div className='image-list-wrapper'>
                        {modifyProduct.productImages.map(r => {
                            return (
                                <div key={r.id} className='image-box'>
                                    <img
                                        className='image-item'
                                        src={r.fileFullUri}
                                        alt="file"
                                    ></img>
                                    <button
                                        type='button'
                                        className='image-delete-button'
                                        onClick={() => __modifyProduct.action.deleteImage(r.id)}
                                    >
                                        <img
                                            className='image-delete-button-icon'
                                            src='/assets/icon/remove_default_red.svg'
                                            alt='delete icon'
                                        ></img>
                                    </button>
                                </div>
                            );
                        })}
                        <button
                            type='button'
                            className='image-add-button-item'
                            onClick={__modifyProduct.action.openFileUploader}
                        >
                            <img
                                className='image-add-button-icon'
                                src='/assets/icon/add_default_gray.svg'
                                alt={'add default'}
                            ></img>
                        </button>
                    </div>
                    <input
                        ref={fileUploaderRef}
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onClick={(e) => e.target.value = ''}
                        onChange={(e) => __modifyProduct.change.pushImage(e)}
                    />
                </div>
                <div className='input-box'>
                    <div className='input-label'>제품명</div>
                    <input
                        type='text'
                        className='input-item'
                        name='name'
                        value={modifyProduct.name || ''}
                        onChange={__modifyProduct.change.valueOfName}
                        required
                    ></input>
                </div>
                <div className='input-box'>
                    <CustomSelect
                        style={{
                            margin: 0
                        }}
                        name='productCategoryId'
                        value={modifyProduct.productCategoryId || ''}
                        onChange={__modifyProduct.change.valueOfName}
                        required
                    >
                        <option value=''>카테고리 선택</option>
                        {allCategories?.map(r => {
                            return (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </CustomSelect>
                </div>
                <div className='input-box'>
                    <div className='input-label'>시간당 가격(원)</div>
                    <input
                        type='text'
                        className='input-item'
                        name='price'
                        value={numberFormatHandler().numberWithCommas(modifyProduct.price) || ''}
                        onChange={__modifyProduct.change.price}
                    ></input>
                </div>
                <div className='input-box'>
                    <div className='input-label'>최소 대여 가능 시간</div>
                    <input
                        type='text'
                        className='input-item'
                        name='minimumRentalHour'
                        value={modifyProduct.minimumRentalHour || ''}
                        onChange={__modifyProduct.change.minimumRentalHour}
                        required
                    ></input>
                </div>
                {/* <div className='input-box'>
                    <div className='input-label'>연박 할인(%)</div>
                    <input
                        type='text'
                        className='input-item'
                        name='discountRate'
                        value={modifyProduct.discountRate || ''}
                        max={100}
                        min={0}
                        onChange={__modifyProduct.change.discountRate}
                    ></input>
                </div> */}
                <div className='input-box'>
                    <div>
                        <CustomCheckbox
                            label={'할인 적용하기'}
                            checked={modifyProduct.discountYn === 'y' ? true : false}
                            onChange={__modifyProduct.change.discountYn}
                            labelStyle={{
                                color: '#000000de'
                            }}
                        />
                    </div>
                    {modifyProduct.discountYn === 'y' &&
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input
                                    type='text'
                                    className='input-item'
                                    name='discountMinimumHour'
                                    value={modifyProduct.discountMinimumHour || ''}
                                    max={100}
                                    min={0}
                                    placeholder={''}
                                    onChange={__modifyProduct.change.discountMinimumHour}
                                    style={{
                                        textAlign: 'center'
                                    }}
                                ></input>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>시간 이상 대여시</div>
                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
                                <input
                                    type='text'
                                    className='input-item'
                                    name='discountRate'
                                    value={modifyProduct.discountRate || ''}
                                    max={100}
                                    min={0}
                                    onChange={__modifyProduct.change.discountRate}
                                    style={{
                                        textAlign: 'center'
                                    }}
                                ></input>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>(%) 할인</div>
                        </div>
                    }
                </div>
                <div className='input-box'>
                    <div className='input-label'>설명</div>
                    <textarea
                        className='textarea-item'
                        name='description'
                        value={modifyProduct.description || ''}
                        onChange={__modifyProduct.change.valueOfName}
                    ></textarea>
                </div>
                <div className='input-box'>
                    <SingleBlockButton
                        type='submit'
                        style={{
                            margin: 0,
                            background: '#000000',
                            color: 'white',
                            border: 'none'
                        }}
                    >
                        수정
                    </SingleBlockButton>
                </div>
            </form>
        </ModifyModalWrapper>
    );
}

const initialModifyProduct = null;
const modifyProductReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialModifyProduct;
        default: return initialModifyProduct;
    }
}