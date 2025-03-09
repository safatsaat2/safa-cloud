import Header from '@/components/shared/Header';
import TranformationForm from '@/components/shared/TranformationForm';
import { transformationTypes } from '@/constants';
import React from 'react';

const AddTransformationTypePage = ({params: {type}} : SearchParamProps) => {
    const transformation = transformationTypes[type];
    return (
        <>
        <Header title={transformation.title}
        subTitle={transformation.subTitle}
        />
        <TranformationForm/>
        </>
    );
};

export default AddTransformationTypePage;