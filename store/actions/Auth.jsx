export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
        dispatch({type: SIGNUP});
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
        dispatch({type: LOGIN});
     };
};