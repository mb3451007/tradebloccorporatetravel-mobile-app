/* eslint-disable prettier/prettier */
import React from 'react';

// Navigation Container Ref
const navigationRef = React.createRef<any>();


// Navigation Methods
export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
}

export function back() {
    navigationRef.current?.goBack();
}

export default navigationRef;
