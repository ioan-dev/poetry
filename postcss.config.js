export default {
    plugins: {
        'postcss-media-minmax': {},
        'postcss-pxtorem': {
            rootValue: 16, // 1rem = 16px
            propList: ['*'], // Преобразовывать все свойства
            minPixelValue: 1, // Не преобразовывать значения меньше 1px
        },
    },
};
