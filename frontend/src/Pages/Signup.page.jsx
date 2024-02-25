import {json, Link, useNavigate, useParams} from "react-router-dom";
import {URL_ROUTES} from "../Resources/UTILS/URL_ROUTES.routes";
import {API_URL} from "../Resources/UTILS/ENUMS";
import {useState} from "react";


function SignupPage() {
    let valid = true;
    const navigate = useNavigate(); // Initialize the navigate function

    // STATES
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //HANDLERS
    const nameHandleChange = (event) => {
        setUserName(event.target.value);
    }
    const passwordHandleChange = (event) => {
        setPassword(event.target.value);
    }
    const confirmPasswordHandleChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSignUp = () => {
        signupCheckValid();
        if(valid === true){
            signupFetch();
        }
        setUserName('');
        setPassword('');
        setConfirmPassword('');
    }


    function signupCheckValid() {
        if(userName == null || password == null || confirmPassword == null){
            alert("missing information")
            valid = false;
        }
        if(password !== confirmPassword){
            alert("password not match");
            valid = false;
        }
        //checkUser();
    }

    //Fetch
    const signupFetch = async () => {
        try {
            const response = await fetch(API_URL+ `/api/user/create?user_name=${userName}&user_password=${password}`,{
            }); //Replace with your API endpoint
            const jsonData = await response.json();
            console.log(jsonData.name + jsonData.password)
            alert("Created Successful: User: " + jsonData.name);
            navigate(URL_ROUTES.LOGIN);
        } catch (error){
            console.log(error.message);
        }
    }


    return (
        <div className="login_body row">
            <div className="login bg-light col-9 col-md-6 rounded-2 p-5 m-auto">
                <div className="text-center">
                    <h1>Welcome to Agile Ace!</h1>
                </div>

                <div className="input-group mt-4 custom-input-group">
                    <input placeholder="Username"
                           type="text"
                           className="form-control rounded-pill"
                           aria-label="Email"
                           onChange={nameHandleChange}
                           aria-describedby="inputGroup-sizing-lg"/>
                </div>

                <div className="input-group mt-4">
                    <input placeholder="Password"
                           type="password"
                           className="form-control rounded-pill"
                           aria-label="Username"
                           onChange={passwordHandleChange}
                           aria-describedby="inputGroup-sizing-lg"/>
                </div>

                <div className="input-group mt-4 custom-input-group">
                    <input placeholder="Confirm Password"
                           type="password"
                           className="form-control rounded-pill"
                           aria-label="Password"
                           onChange={confirmPasswordHandleChange}
                           aria-describedby="inputGroup-sizing-lg"/>
                </div>

                <div className="flex-center">
                    <button type="button"  onClick={handleSignUp}
                            className="login_btn btn mt-4 flex-center rounded-pill"> Sign up

                        <ion-icon name="log-in"></ion-icon>
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p>
                        Have an account? <Link to={URL_ROUTES.LOGIN}
                                                  className="text-primary text-decoration-none">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;