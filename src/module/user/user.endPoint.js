import { roles } from "../../middleware/auth.js";
export const endPoints = {

    addAdmin:[roles.superAdmin],
    allAdmins:[roles.superAdmin,roles.Admin],
    user:[roles.User],


}
