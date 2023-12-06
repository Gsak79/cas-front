export function areAllFilesImages(files) {
    for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith('image/')) {
            return false;
        }
    }
    return true;
}