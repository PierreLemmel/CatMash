import React from 'react';

export type LoadingTextProps = {
    text: string
};
export const LoadingText = (props: LoadingTextProps) => <div className="text-center my-5">{props.text}</div>;