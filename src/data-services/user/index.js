
// Data Flow: Step 2
import { apiSignIn } from "data-source/user";

// transform data to fit with UI;
export const userService = {
    signIn: function (params) {
        return apiSignIn(params).then(response => {
            return response;
        });
    },
   
}
