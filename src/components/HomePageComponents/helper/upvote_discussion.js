import Cookies from "js-cookie";
import instance from "../../../helper/axios";

export const upvoteDiscussion = async (userDetails, history, discussionId, type) => {

    const token = Cookies.get("token");

    if (!token) {
        history.replace("/signin");
    }

    if (!userDetails.isVerified) {
        return alert("Your verification is under process!");
    }

    try {
        await instance.post(
            `/discussion/vote/${type}`,
            {
                discussionId,
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );

    } catch (error) {
        if (error.response.status === 500 || error.response.status === 400) {
            return alert(`Server error occured!`);
        }
        if (error.response.status === 408) {
            return alert(`Your verification is under process!`);
        }
        if (error.response.status === 401) {
            return;
        }
        return alert(`Your session has expired, please login again!`);
    }
}