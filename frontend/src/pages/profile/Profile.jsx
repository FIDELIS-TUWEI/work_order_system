import ProfileComponent from "../../components/ProfileComponent";
import TopBar from "../../components/common/TopBar";
import PageMenu from "../../components/pageMenu/PageMenu";

const Profile = () => {
    return ( 
        <>
            <TopBar />
            <PageMenu />
            <ProfileComponent />
        </>
     );
}
 
export default Profile;