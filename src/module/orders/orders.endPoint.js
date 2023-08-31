import { roles } from "../../middleware/auth.js";
export const endPoints = {
    admin:[roles.Admin,roles.superAdmin],
    user:[roles.User],

}
