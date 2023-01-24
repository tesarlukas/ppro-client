import { useRouteError } from "react-router-dom"


export const Error: React.FC = () => {
    const error = useRouteError();
    console.error(error);
    
    return (
        <div id="error-page">
            <h1>Error Occured!</h1>
            <p>
                <i>{error.status + " " + error.statusText}</i>
            </p>
        </div>
    )
}

export default Error;