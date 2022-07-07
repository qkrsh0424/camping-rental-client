import { fileDataConnectV2 } from "../../../data_connect/fileDataConnect";

const useImageFileUploaderHook = () => {
    /**
     * Upload iamge file and Get image info.
     * 
     * @param {Object} e 
     * @returns {Object} imageData
     */
    const __reqUploadImageFile = async (e) => {
        const formData = new FormData();

        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('files', e.target.files[i]);
        }

        return await fileDataConnectV2().uploadImageToS3(formData)
            .then(res => {
                if (res.status === 200) {
                    return res.data.data;
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(err);
                if (!res) {
                    alert('네트워크 연결 상태가 원활하지 않습니다.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    return {
        __reqUploadImageFile: __reqUploadImageFile
    }
}

export { useImageFileUploaderHook };