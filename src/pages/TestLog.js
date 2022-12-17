// components
import Page from './Page';
// sections
// ----------------------------------------------------------------------
//user
import {useAuthContext} from "../auth/useAuthContext";
export default function TestLog() {
    const { user } = useAuthContext();
    console.log("user: ", user);
    return (
        <Page title={user.username}>
            <h1>hello {user.username}</h1>
            <p>{user.groups}</p>
        </Page>
    );

}