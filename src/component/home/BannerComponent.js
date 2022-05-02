import styled from "styled-components";

const Container = styled.div`
    overflow: hidden;
    /* padding: 30px; */
`;

const ImageBox = styled.div`
    width:100%;

   .image-figure{
        position: relative;
        padding-bottom: 43.75%; // 1280 x 560
        

        @media all and (max-width:992px){
            padding-bottom: 70%; // 1280 x 560
        }
   }

   .image-el{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:none;
   }
`;
const BannerComponent = () => {
    return (
        <>
            <Container>
                <ImageBox>
                    <div className="image-figure">
                        <img className='image-el' src='/assets/banner/home_banner1.png'></img>
                    </div>
                </ImageBox>
            </Container>
        </>
    );
}

export default BannerComponent;