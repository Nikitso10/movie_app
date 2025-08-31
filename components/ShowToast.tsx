import { ToastAndroid } from 'react-native';


const ShowToast = (message : string) => {

    const myToast = () => {
        ToastAndroid.show(message, 2000);
    };

    return (
        myToast()
    )
}
export default ShowToast
