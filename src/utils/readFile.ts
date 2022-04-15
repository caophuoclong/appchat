const readFile = (file: File) => {
    return new Promise<ArrayBuffer | string>((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result!);
        };
        fr.onerror = () => {
            reject(fr);
        };
        fr.readAsDataURL(file);
    });
};

export default readFile;