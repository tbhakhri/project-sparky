import React, { useState } from "react";
import Image from 'next/image';
import compareIcon from "../../../public/compare.svg";

const CompareButton = () => {
    return (
        <button style={styles.container}>
            <div style={styles.background} />
            <div style={{width: 74.12, height: 14, left: 16, top: 5, position: 'absolute'}}>
                <Image
                    src={compareIcon}
                    alt="Compare Icon"
                />
                <div style={{width: 53, height: 14, left: 21.12, top: 0, position: 'absolute', color: 'white', fontSize: 10, fontFamily: 'Kumbh Sans', fontWeight: '400', wordWrap: 'break-word'}}>Compare</div>
            </div>
        </button>
    );
};

const styles = {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    background: {
        width: 104, 
        height: 23, 
        left: 0, 
        top: 0, 
        position: 'absolute', 
        background: '#1A3059', 
        borderRadius: 20
    },
    imageStyling: {

    }
};
export default CompareButton;