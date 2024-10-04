/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable id-blacklist */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import moment from 'moment';

const plans: any = [
    {
        id: 0,
        title: 'Inventario',
        content: '',
        url: 'inventario',
        icon:'home',
        rol: ["PYMES_DIR"]
    },
    {
        id: 1,
        title: 'Empleados',
        content: '',
        url: 'empleados',
        icon:'assistant',
        rol: ["PYMES_DIR"]
    },

];
const register_types: any = [
    {
        id: 0,
        title: 'Principal',
        content: '',
        url: 'principal',
        icon:''
    },
];

const getToken = function () {
    const generate = function generatedigit(input: string) {
        // eslint-disable-next-line quotes
        const array = input.split('').reverse();

        let total = 0;
        let i = 1;
        array.forEach((number: any) => {
            number = parseInt(number, 10);
            if (i % 2 === 0) {
                total = total + number;
            } else {
                total = total + number * 3;
            }
            i++;
        });
        return Math.ceil(total / 10) * 10 - total;
    };

    const aleatorNumber = Math.floor(100000 + Math.random() * 900000)
        .toString()
        .substring(0, 3);
    const timestamp = moment().utcOffset(-5).unix();
    const prevCheck = `${aleatorNumber}${timestamp}`; // 13 digitos
    const digit = generate(prevCheck);
    return Buffer.from(`${timestamp}:${digit}:${aleatorNumber}`).toString(
        'base64'
    );
};

export const UTILITIES_CONSTANTS = Object.freeze({
    plans: plans,
    register_types: register_types,
    getToken: getToken,
});
