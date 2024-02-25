import { useParams } from "react-router-dom";
import "../Resources/CSS/notfound.css"

function NotfoundPage() {
    let { id } = useParams();
    return (
        <div className="Notfound">
            <div>not found</div>
        </div>
    );
}

export default NotfoundPage;
