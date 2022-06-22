import { useEffect, useReducer } from "react";
import { regionDataConnect } from "../../../data_connect/regionDataConnect";
import NavbarComponent from "../navbar/Navbar.component";
import RegionsFieldComponent from "./regions-field/RegionsField.component";

export default function MainComponent(props) {
    const [regions, dispatchRegions] = useReducer(regionsReducer, initialRegions);

    useEffect(() => {
        async function fetchInit() {
            await __regions.req.fetch();
        }

        fetchInit();
    }, []);

    const __regions = {
        req: {
            fetch: async () => {
                await regionDataConnect().searchList()
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
                if(regions.length > 2){
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
            <NavbarComponent />
            <RegionsFieldComponent
                regions={regions}
                onSubmitAdd={__regions.submit.add}
                onSubmitModify={__regions.submit.modify}
                onSubmitDelete={__regions.submit.delete}
            />
        </>
    );
}

const initialRegions = [];

const regionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialRegions;
        default: return initialRegions;
    }
}