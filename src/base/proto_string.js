String.prototype.firstUpperCase = function () {
    let arr = this.split(' ');
    let upperWords = [];
    arr.forEach((str) => {
        upperWords.push(str.charAt(0).toUpperCase() + str.slice(1));
    });
    let result = upperWords.join(' ');
    return result;
}; /* 单词首字母大写 */

String.prototype.dataURItoBlob = function () {
    let dataURI = this.toString();
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    let ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let blob = new Blob([ab], { type: mimeString });
    return blob;
};

String.prototype.validateEmail = function () {
    let email = this.toString();
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}; /* 邮箱地址验证 */

String.prototype.encodeNonASCII = function () {
    let arr = [...this];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].charCodeAt() > 255) arr[i] = encodeURI(arr[i]);
    }
    return arr.join('');
};

String.prototype.decodeHTMLEntity = function () {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = this;
    let value = textarea.value;
    textarea.remove();
    return value;
};

String.prototype.encodeHTMLEntity = function () {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(this));
    return div.innerHTML;
};
