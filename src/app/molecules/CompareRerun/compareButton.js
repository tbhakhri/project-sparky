import React from "react";
import Image from 'next/image';

const CompareButton = () => {
    return (
        <button style={styles.buttonContainer}>
            <Image
                src="/compare.svg"
                alt="Compare Icon"
            />
        </button>

    );
};

export default CompareButton;