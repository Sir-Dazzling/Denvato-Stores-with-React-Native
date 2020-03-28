import {AsyncStorage} from 'react-native';

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => 
{
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };
};

//signup action
export const signUp = (firstName, lastName, email, password) => 
{
    //posting signup details to firebase api link
    return async dispatch => {
       const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAre11deHIs3KvNp0GDTcc_lXCHrnkwXZ0", 
        {
            method: "POST",
            headers: 
            {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        //Handling errors
        if (!response.ok) 
        {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') 
            {
              message = 'This email exists already!';
            }
            throw new Error(message);
          }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        //Getting time toke would expire and saving it into hardware storage of device
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000); 
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};


//signin action
export const login = (email, password) => 
{
    //posting login details to firebase api link
    return async dispatch => {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAre11deHIs3KvNp0GDTcc_lXCHrnkwXZ0", 
        {
            method: "POST",
            headers: 
            {
             "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
         });

        //Handling errors
        if(!response.ok)
        {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') 
            {
              message = 'This email does not exist';
            }
            else if (errorId === 'INVALID_PASSWORD') 
            {
              message = 'The password is incorrect';
            }
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        //Getting time toke would expire and saving it into hardware storage of device
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000); 
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
     };
};

const saveDataToStorage = (token, userId, expirationDate) => 
{
  AsyncStorage.setItem("userData", JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
  }));  
};

//Logout action
export const logout = () => 
{
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    return {type: LOGOUT};
};

//Clearing logout timer
const clearLogoutTimer = () => 
{
    if(timer)
    {
        clearTimeout(timer);
    }
};

//Setting timer for logout
const setLogoutTimer = (expirationTime) => 
{
    return (dispatch) => {
        timer = setTimeout(() => 
        {
            dispatch(logout());
        }, expirationTime);
    };
    
};