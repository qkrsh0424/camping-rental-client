import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { regionDataConnect } from "../../../data_connect/regionDataConnect";
import { roomDataConnect } from "../../../data_connect/roomDataConnect";
import { useCustomRouterHook } from "../../../hooks/router/useCustomRouterHook";
import PrivateField from "../../module/field/PrivateField";
import NavbarComponent from "../navbar/Navbar.component";
import IntroductionFieldComponent from "./introduction-field/IntroductionField.component";
import RegionsFieldComponent from "./regions-field/RegionsField.component";
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 150px;
`;

export default function MainComponent(props) {
    const userRdx = useSelector(state => state.userRedux);
    const customRouter = useCustomRouterHook();
    const [room, dispatchRoom] = useReducer(roomReducer, initialRoom);
    const [regions, dispatchRegions] = useReducer(regionsReducer, initialRegions);

    useEffect(() => {
        if (!customRouter.isReady || userRdx.isLoading || !userRdx.userInfo) {
            return;
        }

        __room.req.fetch();
        __regions.req.fetch();

    }, [customRouter.isReady, userRdx]);

    const __room = {
        req: {
            fetch: async () => {
                let roomId = userRdx.userInfo.roomId;

                await roomDataConnect().searchOne({ roomId: roomId })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchRoom({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err, err.response);
                        dispatchRoom({
                            type: 'CLEAR'
                        })
                    })
            },
            changeIntroduction: async (introduction) => {
                let roomId = userRdx.userInfo.roomId;

                await roomDataConnect().changeIntroduction({ roomId: roomId, introduction: introduction })
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
            changeIntroduction: async (introduction) => {
                await __room.req.changeIntroduction(introduction);
                await __room.req.fetch();
            }
        }
    }

    const __regions = {
        req: {
            fetch: async () => {
                let roomId = userRdx.userInfo.roomId;

                await regionDataConnect().searchListByRoomId({ roomId: roomId })
                    .then(res => {
                        if (res.status === 200) {
                            dispatchRegions({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                        dispatchRegions({
                            type: 'CLEAR'
                        })
                    })
            },
            create: async (body) => {
                await regionDataConnect().create(body)
                    .then(res => {
                        if (res.status === 200) {

                        }
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
            update: async (body) => {
                let id = body.id;
                await regionDataConnect().update(id, body)
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
            delete: async (id) => {
                await regionDataConnect().delete(id)
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
                if (regions.length > 2) {
                    alert('픽업|반납 장소는 최대 3개까지만 등록할 수 있습니다.')
                    return;
                }

                await __regions.req.create(body);
                await __regions.req.fetch();
            },
            modify: async (body) => {
                await __regions.req.update(body);
                await __regions.req.fetch();
            },
            delete: async (body) => {
                let id = body.id;
                await __regions.req.delete(id);
                await __regions.req.fetch();
            }
        }
    }

    return (
        <>
            <Container>
                <NavbarComponent />
                <PrivateField>
                    {room &&
                        <IntroductionFieldComponent
                            room={room}
                            onSubmitChangeIntroduction={__room.submit.changeIntroduction}
                        />
                    }
                    {regions &&
                        <RegionsFieldComponent
                            regions={regions}
                            onSubmitAdd={__regions.submit.add}
                            onSubmitModify={__regions.submit.modify}
                            onSubmitDelete={__regions.submit.delete}
                        />
                    }
                </PrivateField>
            </Container>
        </>
    );
}

const initialRoom = null;
const initialRegions = [];

const roomReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRoom;
        default: return initialRoom;
    }
}

const regionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRegions;
        default: return initialRegions;
    }
}