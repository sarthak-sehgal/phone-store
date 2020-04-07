import db, { auth } from "../../serverConfig";
import { authStartLoading, authStopLoading } from "./index";
import { STORE_USER, AUTH_ERROR, NEW_USER_AUTH, STORE_USER_DATA } from "./actionTypes";
const _ = require("lodash");

export const doesUserExists = (values) => {
  return async (dispatch) => {
    console.log("Inside doesUserExists");
    dispatch(authStartLoading());
    try {
			const users = await fetchUsers();
			const userObj = _.find(users, { phoneNum: values.phoneNum });
      const isNewUser = userObj === undefined;
			if (!isNewUser)
				dispatch(storeUserData(userObj));
      dispatch(newUserAuth(isNewUser));
    } catch (err) {
      console.log(err);
      dispatch(authError(true, "Some error occurred. Please try again."));
    } finally {
      dispatch(authStopLoading());
    }
  };
};

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    let users = {};
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          users[doc.id] = doc.data();
        });
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginUser = (values, user) => {
  return (dispatch, getState) => {
    dispatch(authStartLoading());
    const isNewUser = getState().auth.isNewUser;
    if (isNewUser) {
      values.createdOn = new Date();
      if (
        !values.email ||
        !values.phoneNum ||
        !values.firstName ||
        !values.lastName
      ) {
				dispatch(authError(true, "Please enter all values correctly."));
				dispatch(authStopLoading());
      } else {
				db.collection("users")
					.doc(user.uid)
          .set(values)
          .then((ref) => {
						console.log("Added doc with ref " + ref);
						dispatch(storeUserData({...values}));
            dispatch(storeUser(user));
          })
          .catch((err) => {
            dispatch(authError(true, "Some error occurred. Please try again."));
          })
          .finally(() => dispatch(authStopLoading()));
      }
    } else {
      storeUser(user);
      dispatch(authStopLoading());
    }
  };
};

export const logout = () => {
	return dispatch => {
		dispatch(authStartLoading());
		auth.signOut()
		.then(() => dispatch(storeUser(null)))
		.catch((err) => {
			console.log(err);
			dispatch(authError(true, "Some error occurred. Please try again."));
		}
		)
	}
}

export const storeUser = (user) => {
  return {
    type: STORE_USER,
    user,
  };
};

export const storeUserData = (data) => {
  return {
    type: STORE_USER_DATA,
    data,
  };
};

export const authError = (isError, errorMsg) => {
  return {
    type: AUTH_ERROR,
    isError,
    errorMsg,
  };
};

export const newUserAuth = (isNewUser) => {
  return {
    type: NEW_USER_AUTH,
    isNewUser,
  };
};
