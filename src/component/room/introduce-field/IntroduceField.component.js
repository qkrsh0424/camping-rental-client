import styled from 'styled-components';

const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const Wrapper = styled.div`
    padding:50px 0;
    /* border-bottom:1px solid #e0e0e0; */
`;

const RoomSummaryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    

    @media all and (max-width: 992px){
        flex-direction: column;
    }

    .profile-image-wrapper{
        display: flex;
        align-items: center;

        @media all and (max-width: 992px){
            flex:1;
            justify-content: center;
        }
    }

    .profile-image-box{
        width: 200px;
        height: 200px;
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        @media all and (max-width: 992px){
            width: 150px;
            height: 150px;
        }
    }

    .profile-image{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .count-wrapper{
        display: flex;
        align-items: center;

        @media all and (max-width: 992px){
            margin-top: 40px;
            flex:1;
            justify-content: space-around;
        }
    }

    .count-box{
        user-select: none;
        display: flex;
        align-items: center;
        width: 100px;
        height: 100px;
        margin-left: 20px;

        @media all and (max-width: 992px){
            margin-left: 0;
            flex:1;
        }
    }

    .count-box-content{
        flex: 1;
        text-align: center;
    }

    .count-box-content .title{
        font-size: 16px;
        font-weight: 500;
        color:#505050;
    }

    .count-box-content .count{
        margin-top: 5px;
        font-size: 16px;
        font-weight: 500;
        color:#505050;
    }
`;

const IntroductionWrapper = styled.div`
    margin-top: 40px;
    /* width:50%; */
    flex:1;

    @media all and (max-width: 992px){
        width:100%;
    }

    .title{
        font-size: 18px;
        font-weight: 600;
    }

    .description{
        font-size: 16px;
        margin-top: 10px;
        white-space: pre-line;
    }
`;

export default function IntroduceFieldComponent(props) {
    return (
        <>
            <Container>
                <Wrapper>
                    <RoomSummaryWrapper>
                        <div className='profile-image-wrapper'>
                            <div
                                className='profile-image-box'
                            >
                                <img
                                    className='profile-image'
                                    src='/assets/banner/home_banner2.png'
                                    alt="profile"
                                />
                            </div>
                        </div>
                        <div className='count-wrapper'>
                            <div
                                className='count-box'
                            >
                                <div
                                    className='count-box-content'
                                >
                                    <div className='title'>제품수</div>
                                    <div className='count'>100 개</div>
                                </div>
                            </div>
                            <div
                                className='count-box'
                            >
                                <div
                                    className='count-box-content'
                                >
                                    <div className='title'>평점</div>
                                    <div className='count'>5.0 / 5.0</div>
                                </div>
                            </div>
                            <div
                                className='count-box'
                            >
                                <div
                                    className='count-box-content'
                                >
                                    <div className='title'>후기</div>
                                    <div className='count'>100 개</div>
                                </div>
                            </div>
                        </div>
                    </RoomSummaryWrapper>
                    <div
                        style={{
                            display: 'flex',
                            // flexDirection:'column'
                        }}
                    >
                        <IntroductionWrapper>
                            <div className='title'>소개글</div>
                            <div className='description'>
                                {`hello world hello world hello world hello world hello world
                            hello world hello world hello world hello world hello world
                            hello world hello world hello world hello world hello world
                            hello world hello world hello world hello world hello world`}
                            </div>
                        </IntroductionWrapper>
                        <IntroductionWrapper>
                            <div className='title'>픽업 | 반납 장소</div>
                            <div className='description'>

                            </div>
                        </IntroductionWrapper>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}