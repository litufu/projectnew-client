uploadImage(imgUrl) {

    let url = Url.ossFile; //图片服务器
    
    let formData =newFormData();// 把图片放入formData中,采用formData来实现
    
    let file = { uri:  imgUrl, type: 'multipart/form-data', name: 'image.png' };// 这里的key(uri和type和name)不能改变,此处type也有可能是'application/octet-stream',看后台配置
    
    formData.append('file', file); // 有可能是file 也有可能是images 看后台的配置
    
    return fetch(url, {
    
    method: 'POST',
    
    headers:  {
    
    'Content-Type': 'multipart/form-data; charset = utf-8'
    
    },
    
    body: formData
    
    })
    
    .then((response) => response.text())
    
    .then((responseData) => {
    
    console.log('responseData', responseData);
    
    })
    
    .catch((error) => {console.error('error', error) });
    
    }
 