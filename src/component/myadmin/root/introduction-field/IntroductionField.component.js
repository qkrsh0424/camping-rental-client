import _ from 'lodash';
import { useEffect, useState } from 'react';
import valueUtils from '../../../../utils/valueUtils';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import { Container, HeadWrapper, IntroductionWrapper, ModifyModalWrapper, Wrapper } from './IntroductionField.styled';

export default function IntroductionFieldComponent(props) {
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

    const __room = {
        action: {
            openModifyModal: () => {
                setModifyModalOpen(true);
            },
            closeModifyModal: () => {
                setModifyModalOpen(false);
            }
        },
        submit: {
            modifyIntroduction: (introduction) => {
                setDisabledBtn(true);
                props.onSubmitChangeIntroduction(introduction);
                __room.action.closeModifyModal();
            }
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Head
                        onActionOpenModifyModal={__room.action.openModifyModal}
                    />
                    <Introduction
                        room={props.room}
                    />
                </Wrapper>
            </Container>

            {modifyModalOpen &&
                <CommonModalComponent
                    open={modifyModalOpen}
                    onClose={__room.action.closeModifyModal}
                >
                    <ModifyModal
                        room={props.room}
                        onActionCloseModifyModal={__room.action.closeModifyModal}
                        onSubmitModify={__room.submit.modifyIntroduction}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function Head({
    onActionOpenModifyModal
}) {
    return (
        <HeadWrapper>
            <div className='title'>????????? ??????</div>
            <SingleBlockButton
                type='button'
                className='button-item'
                onClick={onActionOpenModifyModal}
            >
                ??????
            </SingleBlockButton>
        </HeadWrapper>
    );
}

function Introduction({
    room
}) {
    return (
        <>
            {valueUtils.isEmptyValues(room.introduction) &&
                (
                    <div
                        style={{
                            textAlign: 'center',
                            margin: '100px 0',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >???????????? ????????? ?????????.</div>
                )
            }
            <IntroductionWrapper>
                {room.introduction}
            </IntroductionWrapper>
        </>
    );
}

function ModifyModal({
    room,
    onActionCloseModifyModal,
    onSubmitModify,
    disabledBtn
}) {
    const [introduction, setIntroduction] = useState('');

    useEffect(() => {
        setIntroduction(_.cloneDeep(room.introduction));
    }, [room]);

    const __handle = {
        change: {
            introduction: (e) => {
                let value = e.target.value;
                setIntroduction(value);
            }
        },
        submit: {
            confirm: () => {
                if (introduction.length > 400) {
                    alert('???????????? ?????? 400??? ?????? ????????? ??? ????????????.');
                    return;
                }
                onSubmitModify(introduction);
            }
        }
    }

    return (
        <ModifyModalWrapper>
            <div className='input-box'>
                <textarea
                    className='textarea-item'
                    value={introduction || ''}
                    placeholder='???????????? ????????? ?????????.'
                    onChange={__handle.change.introduction}
                    maxLength={400}
                ></textarea>
                <div className='text-length-label'>
                    {introduction.length} / 400
                </div>
            </div>
            <div className='button-box'>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={onActionCloseModifyModal}
                >
                    ??????
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
                    ??????
                </SingleBlockButton>
            </div>
        </ModifyModalWrapper>
    );
}