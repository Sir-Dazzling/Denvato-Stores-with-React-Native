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
        if(!response.ok)
        {
            throw new Error("Something went wrong.");
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
            throw new Error("Something went wrong.");
        } 
        const resData = await response.json();
        console.log(resData);
        dispatch({type: LOGIN});
     };
};