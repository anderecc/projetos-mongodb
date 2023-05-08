const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z]).{6,12})/;

const verifyValue = (type, value, secondValue) => {
    switch (type) {
        case 'name':
            if (value.trim() && value.length > 0) {
                return true;
            } else {
                return false;
            }
        case 'email':
            if (!value.match(emailRegex)) {
                return false;
            } else {
                return true;
            }
        case 'password':
            if (!value.match(passwordRegex)) {
                return false;
            } else {
                return true;
            }

        case 'confirmPassword':
            if (value === secondValue) {
                return true;
            } else {
                return false;
            }

        default:
            break;
    }
};

export default verifyValue;
