export function download(response: any): void {
    // 提取文件名
    const fileName = response.headers['content-disposition']
        .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        .replace(/['"]/g, '');
    // 将二进制流转为blob

    const blob = new Blob([response.data], {
        type: 'application/octet-stream'
    });

    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob);
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', fileName);
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        // 挂载a标签
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL);
    }
}
