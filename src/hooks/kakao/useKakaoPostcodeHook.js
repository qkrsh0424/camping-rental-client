import { useRef } from "react";

export default function useKakaoPostcodeHook(props) {
    const client = useRef({});

    const open = ({
        callback
    }) => {
        client.current = new window.daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                callback(data);
            },
            onresize: function (size) {
                //size는 우편번호 찾기 화면의 크기 데이터 객체이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
            },
            onclose: function (state) {
                //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
                if (state === 'FORCE_CLOSE') {
                    //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.

                } else if (state === 'COMPLETE_CLOSE') {
                    //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
                    //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
                }
            },
            onsearch: function (data) {
                //data는 검색결과에 대한 검색어와 갯수를 가지고 있는 데이터 객체입니다.
            },
            theme: {
                searchBgColor: "#b39283", //검색창 배경색
                queryTextColor: "#FFFFFF" //검색창 글자색
            }
        }).open();
    }

    return {
        open
    }
}