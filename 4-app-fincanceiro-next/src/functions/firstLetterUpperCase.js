export default function (text) {
    if (text === '') {
        return '';
    } else {
        return text[0].toUpperCase() + text.slice(1);
    }
}
