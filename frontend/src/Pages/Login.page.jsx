import {Link, useNavigate, useParams} from "react-router-dom";
import {URL_ROUTES} from "../Resources/UTILS/URL_ROUTES.routes";
import {API_URL} from "../Resources/UTILS/ENUMS";
import {useState} from "react";

function LoginPage() {
    let valid = true;
    const navigate = useNavigate(); // Initialize the navigate function

     // STATES
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    //HANDLERS
    const nameHandleChange = (event) => {
        setUserName(event.target.value);
    }
    const passwordHandleChange = (event) => {
        setPassword(event.target.value);
    }
    const handleLogin = () => {
        loginCheckValid();
        getUserFetch();
        setUserName('');
        setPassword('');
    }

    const getUserFetch = async () => {
        try {
            const response = await fetch(API_URL + `/api/user/get?user_name=${userName}&password=${password}`, {
                method:`POST`,
            });
            //Replace with your API endpoint

            const jsonData = await response.json();
            if (jsonData.name != null && jsonData.password != null) {
                console.log(URL_ROUTES.HOME + jsonData.name);
                navigate(URL_ROUTES.HOME);
            } else {
                alert("user name or password is wrong");
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

     function loginCheckValid() {
        if(userName == null || password == null){
            alert("missing information")
            valid = false;
        }
    }

    return (
        <div className="login_body row">
            <div className="login bg-light col-9 col-md-6 rounded-2 p-5 m-auto">
                <div className="text-center">
                    <h1>Welcome back!</h1>
                </div>

                <div className="input-group mt-4">
                    <input type="text"
                           placeholder="Username"
                           className="form-control rounded-pill"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           onChange={nameHandleChange}/>
                </div>

                <div className="input-group mt-4 custom-input-group">
                    <input type="password"
                           placeholder="Password"
                           className="form-control rounded-pill"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"
                           onChange={passwordHandleChange}/>
                </div>

                <div className="flex-center">
                    <button className="login_btn btn mt-4 flex-center rounded-pill"
                            onClick={handleLogin}> Login

                        <ion-icon name="log-in"></ion-icon>
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p>
                    Don't have an account? <Link to={URL_ROUTES.SIGNUP} className="text-primary text-decoration-none">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;