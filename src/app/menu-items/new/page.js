import {useProfile} from "../../../components/UseProfile"
export default NewMenuItemPage(){
    const {loading,data}=useProfile()

if(loading){
    return 'Loading user info...'
}
if(!data.admin){
    return 'Not an admin'
}

return(
    <></>
)
}

