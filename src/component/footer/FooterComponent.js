import styled from "styled-components";

const Container = styled.div`
    border-top: 1px solid #e6e8ed;
    margin-bottom: 100px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    /* max-width: 1200px; */
    padding: 0 30px;
    margin: auto;

    @media all and (max-width:992px){
        padding: 10px;
    }
`;

const MenuItemsBox = styled.div`
    display: flex;
    margin-top: 15px;

    .item-el{
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
    }

    .item-el:first-child::after{
        content: '|';
        font-weight: 500;
        color: #a1a1a1;
        margin-left: 3px;
        margin-right: 3px;
    }

    @media all and (max-width:992px){
        .item-el{
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
        }
    }
`;

const ComponyInfoBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    max-width: 750px;
    .item-el{
        margin-top: 1px;
        margin-bottom: 1px;
        margin-right: 10px;
        font-size: 12px;
        color:#52565d;
    }

    @media all and (max-width:992px){
        flex-direction: column;
        align-items: flex-start;
        max-width: inherit;
        /* margin: 5.55556vw 0 0; */
        font-size: 3.05556vw;
        color: #9da1a8;

        .item-el{
            margin-top: 2px;
            margin-bottom: 2px;
            margin-right: 10px;
            font-size: 10px;
        }
    }
`;

const Copyright = styled.div`
    margin-top: 15px;
    font-size: 12px;
    color:#222;

    @media all and (max-width:992px){
        font-size: 10px;
    }
`;
const FooterComponent = () => {
    return (
        <>
            <Container>
                <Wrapper>
                    <div>
                        <MenuItemsBox>
                            <div className='item-el'>개인정보처리방침</div>
                            <div className='item-el'>이용약관</div>
                        </MenuItemsBox>
                        <ComponyInfoBox>
                            <div className="item-el">상호명: 삼마이</div>
                            <div className="item-el">주소: 서울특별시 마포구 와우산로 11길 25, 3층</div>
                            <div className="item-el">사업자등록번호: 262-17-01212</div>
                            <div className="item-el">통신판매업 신고: 제2020-인천서구-0154호</div>
                            <div className="item-el">고객센터: 010-5003-6206</div>
                            <div className="item-el">이메일: piaartechteam@gmail.com</div>
                            <div className="item-el">대표: 양태영</div>
                            <div className="item-el">개인정보관리책임자: 박세훈</div>
                        </ComponyInfoBox>
                        <Copyright>
                            Copyright ⓒ 2022 All rights reserved by Sammai Co.
                        </Copyright>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}

export default FooterComponent;