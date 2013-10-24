exports.toArrayBuffer = function(buffer){

    // Helper to get an ArrayBuffer from a NodeJS buffer
    // Borrowed here : http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
    function toArrayBuffer(buffer) {
        var ab = new ArrayBuffer(buffer.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return ab;
    }

    return toArrayBuffer(buffer);
}