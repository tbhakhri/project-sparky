import React, { useState } from "react";
import Image from 'next/image';
import compareIcon from "../../../public/compare.svg";

const CompareButton = () => {
    return (
        <button style={styles.buttonContainer}>
            <Image
                src={compareIcon}
                alt="Compare Icon"
            />
        </button>

    );
};

export default CompareButton;