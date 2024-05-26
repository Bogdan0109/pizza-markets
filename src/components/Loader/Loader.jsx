import React from 'react';
import { Audio } from  'react-loader-spinner'


export const Loader = ({ textOne, textTwo }) => (
    <h1 style={{ margin: '5px auto', color: '#154407' }}>
        {/* Please wait... */}
        <p>{textOne}</p>
        <p>{textTwo}</p>
        <p style={{ visibility: 'hidden', fontSize: "15px" }}>{"_"}</p>
        <Audio
            width="100%"
        />
    </h1>
);
