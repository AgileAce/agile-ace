import React, {useEffect, useState} from 'react';
import {API_URL} from "../Resources/UTILS/ENUMS";
import {json, useNavigate} from 'react-router-dom';
import {URL_ROUTES} from "../Resources/UTILS/URL_ROUTES.routes";


function Home() {
    //
    const navigate = useNavigate(); // Initialize the navigate function

    // STATES
    const [groupName, setGroupName] = useState(''); // State to hold the group name for the new game
    const [inputValue, setInputValue] = useState('');


    // HANDLERS
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Clean input field
        fetchJoinNow(inputValue)
        setInputValue('');
    };

    // Handle the input change for creating a new game
    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };


    // On Submitting the create new game
    const handleCreateGame = () => {
        fetchData(); // Log the group name for the new game

        // Optionally, clean the group name input field after creation
        setGroupName('');
    };


    const fetchData = async () => {
      try {
        const response = await fetch(API_URL+ `/api/meeting/create?meeting_name=${groupName}`, {
            method: 'POST',
        }); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log(URL_ROUTES.SESSION  + jsonData.link)
        navigate(URL_ROUTES.SESSION + jsonData.link, {
            state: { jsonData },
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchJoinNow = async (value) => {
      try {
          const URL = API_URL + "/api/meeting/join" + `?meeting_link=${value}`;
          console.log(URL)
          const response = await fetch(URL, {
            method: 'POST',
        }); // Replace with your API endpoint
        const jsonData = await response.json();

        console.log(URL_ROUTES.SESSION  + jsonData.link)
        navigate(URL_ROUTES.SESSION + jsonData.link,  {
            state: { jsonData },
        });
      } catch (error) {
        console.log(error.message);
      }
    };


    return (
        <div className="Home">
            <div id="main_page">
                <div id="sessionID" className="container">
                    <div className="flex-center">
                        <input className="form-control rounded-pill w-50" type="text" placeholder="Please Enter Your Game ID" value={inputValue} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <button onClick={handleSubmit} type="submit" className="d-flex align-items-center btn btn-primary text-center rounded-pill">Join Now
                            <ion-icon class="ms-1" name="add-circle-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <p className="orText">OR</p>

                <div id="newSession" className="container">
                    <p className="newSessionText">Create a new Game?</p>
                    <div className="flex-center marginTop">
                        <input onChange={handleGroupNameChange} className="form-control rounded-pill w-50" type="text" placeholder="Please Enter Your Group Name"/>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <button type="button" onClick={handleCreateGame} className="d-flex align-items-center btn btn-primary text-center rounded-pill">
                            Create
                            <ion-icon class="ms-1" name="add-circle"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
