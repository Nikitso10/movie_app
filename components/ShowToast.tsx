import React, {useState} from 'react';
import { ToastAndroid, View } from 'react-native';

// interface Props {
//     message: string;
//     title: string;
// }

const ShowToast = (message : string, title : string) => {

    //const [toastText, setToastText] = useState(message);

    const myToast = () => {
        ToastAndroid.show(message + title, ToastAndroid.LONG);
    };

    return (
        myToast()
    )
}
export default ShowToast
