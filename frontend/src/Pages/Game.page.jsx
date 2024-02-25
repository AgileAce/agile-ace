import {useLocation, useParams} from "react-router-dom";
import Issue from "../Components/Issue.component";
import User from "../Components/User.component";
import {useEffect, useState} from "react";
import {API_URL, API_WS_URL} from "../Resources/UTILS/ENUMS";
import {URL_ROUTES} from "../Resources/UTILS/URL_ROUTES.routes";

function Game() {
    let { id } = useParams();
    const location = useLocation();
    const dataFromPreviousPage = location.state; // Here is your passed state

    // DATA
    // session/300385
    const MEETING_LINK = `${API_URL}/session/${id}`

    const [users, setUsers] = useState([
        {name: "User 1", isReady: false},
        {name: "User 2", isReady: true},
        {name: "User 3", isReady: false},
        {name: "User 4", isReady: false},
        {name: "User 5", isReady: false},
        {name: "User 6", isReady: false},
        {name: "User 7", isReady: false},
        {name: "User 8", isReady: false},
    ])

    const [issues, setIssues] = useState([
        {name: "Issue 1", distance:"2", friction:"3", relativity:"4", energy:"5", isActive:""},
        {name: "Issue 2", distance:"2", friction:"3", relativity:"4", energy:"5", isActive:""},
        {name: "Issue 3", distance:"2", friction:"3", relativity:"4", energy:"5", isActive:"True"},
    ])

    const planningPokerOptions = [1, 2, 3, 4, 5];

    // STATES
    const [isReady, setIsReady] = useState(false);

    const [selections, setSelections] = useState({
        distance: null,
        fraction: null,
        relativity: null,
    });

    // HANDLERS
    function changeReady() {
        // Check if all selections are not null
        const allSelected = Object.values(selections).every((selection) => selection !== null);

        // Set isReady based on selections
        setIsReady(allSelected);

        if (allSelected)
            setIsReady(!isReady);
    }

    const handleOptionSelect = (category, option) => {
        setSelections((prevSelections) => {
            const updatedSelections = { ...prevSelections, [category]: option };

            // Check if all selections are not null
            const allSelected = Object.values(updatedSelections).every((selection) => selection !== null);

            // Set isReady based on selections
            setIsReady(allSelected);
            if (allSelected) { // All selected
                fetchReady()
            }

            return updatedSelections;
        });
    };

    const fetchReady = async () => {
      try {
          let entry = dataFromPreviousPage.jsonData.entry;

          if (!entry)
              entry = 1;
          if (!selections.friction)
              selections.friction = 1;
          if (!selections.distance)
              selections.distance = 1;
          if (!selections.relativity)
              selections.relativity = 1;

          const URL = API_URL + "/api/entry/update" +
          `?entry_id=${entry}&
          distance=${selections.distance}&
          friction=${selections.friction}&
          relativity=${selections.relativity}`;
          console.log(URL, selections, dataFromPreviousPage)
          const response = await fetch(URL, {
            method: 'POST',
        }); // Replace with your API endpoint
        const jsonData = await response.json();
        console.log(jsonData)
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
        // Get Users and Issues from
        const fetchUsersAndIssues = async () => {
            try {
                const URL_USERS = `${API_URL}/api/entry/get-all?meeting_link=${id}`
                const URL_ISSUES = `${API_URL}/api/ticket/get-all?meeting_link=${id}`
                const usersRequest = fetch(URL_USERS);
                const issuesRequest = fetch(URL_ISSUES);

                const [usersResponse, issuesResponse] = await Promise.all([usersRequest, issuesRequest]);

                if (!usersResponse.ok || !issuesResponse.ok) {
                    throw new Error('Failed to fetch');
                }

                const usersData = await usersResponse.json();
                const issuesData = await issuesResponse.json();

                // Assuming `entries` is the key in usersData where the users are stored
                const formattedUsers = usersData.entries.map(user => ({
                    name: user.name,
                    isReady: user.distance_choice !== 0 && user.friction_choice !== 0 && user.relativity_choice !== 0,
                }));
                setUsers(formattedUsers);

                // Assuming `tickets` is the key in issuesData where the issues are stored
                let formattedIssues = issuesData.tickets.map((issue, index, array) => ({
                    name: issue.name,
                    distance: issue.distance_average.toString(),
                    friction: issue.friction_average.toString(),
                    relativity: issue.relativity_average.toString(),
                    energy: issue.energy_points.toString(),
                    isActive: index === array.length - 1 ? "True" : "", // Marks the last issue as active
                }));
                setIssues(formattedIssues);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUsersAndIssues();

        // Set up an interval to call fetchUsersAndIssues every 2 seconds
        const intervalId = setInterval(fetchUsersAndIssues, 2000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);

    }, [id]); // Assuming `id` is used in the API calls and you want to refetch if it changes


    // HELPER
    // Function to handle copying text to the clipboard
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(MEETING_LINK);
            console.log('Text copied to clipboard');
            // Optionally, show a feedback message to the user
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Handle the error (e.g., show an error message)
        }
    };

    return (
        <div className="container my-5">
            <div className="row m-auto" id="game">
                <div className="col-12 mt-3 col-md-3">
                    <div className="p-4 rounded-2 border">
                        <p><b>GAME ID</b>: {id}</p>
                        <hr/>
                        <div className="scrollable">
                            {
                                issues.map(issue =>
                                    <Issue key={issue.name} title={issue.name} distance={issue.distance}
                                           friction={issue.friction} relativity={issue.relativity}
                                           energy={issue.energy} isActive={issue.isActive}/>)
                            }
                        </div>
                    </div>

                    <div className="p-4 rounded-2 border mt-3 flex-center flex-column">
                        <div className="flex-center flex-column">
                            <p className="lead"> Energy Points:</p>
                            <ion-icon name="help" size="large"></ion-icon>
                        </div>

                        <button
                            className="btn btn-outline-primary rounded-pill flex-center mt-3"
                            onClick={copyToClipboard}>
                            Copy Link
                            <ion-icon name="copy"></ion-icon>
                        </button>
                        <button className="btn btn-outline-primary rounded-pill flex-center mt-3"> Reveal Now
                            <ion-icon name="information-circle-outline"></ion-icon>
                        </button>
                        <button className="btn btn-outline-primary rounded-pill flex-center mt-3"> New Round
                            <ion-icon name="add-circle-outline"></ion-icon>
                        </button>
                    </div>
                </div>

                <div className="col-12 mt-3 col-md-9 m-0">
                    <div className="game-right-side p-4 pt-0 rounded-2 border">
                        <div className="scrollable">
                            {
                                users.map(user => <User key={user.name} userName={user.name} isReady={user.isReady}/>)
                            }
                        </div>
                        <hr/>
                        <User userName="Your Scores" isReady={isReady} your={true} handleReady={changeReady}
                              planningPokerOptions={planningPokerOptions} onOptionSelect={handleOptionSelect} selections={selections} className="text-primary border-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;
