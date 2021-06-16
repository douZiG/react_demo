/* config-overrides.js */
const { override } = require('customize-cra');
 
module.exports = override(
    config => {
        config.output.jsonpFunction = 'webpackJSONP_udisk-ops';
        config.externals = {
            __RAPIOP_APP: '__RAPIOP_APP',
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'styled-components': 'StyledComponents',
            'moment': 'moment',
            '@ucloud-fe/react-components': 'ReactComponents',
            'common-components': 'CommonComponents'
        };
        return config;
    }
);
