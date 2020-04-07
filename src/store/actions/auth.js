import db, { auth } from "../../serverConfig";
import { authStartLoading, authStopLoading, storeCart, saveCart } from "./index";
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
	console.log("Logging out user");
	return (dispatch, getState) => {
		dispatch(authStartLoading());
		auth.signOut()
		.then(() => {
			dispatch(storeUser(null));
			dispatch(storeCart({}));
			localStorage.removeItem("ps-cart");
		})
		.catch((err) => {
			console.log(err);
			dispatch(authError(true, "Some error occurred. Please try again."));
		})
		.finally(() => {
			dispatch(authStopLoading());
		})
	}
}

export const storeUser = (user) => {
  return {
    type: STORE_USER,
    user,
  };
};

export const storeUserData = (data, userObj) => {
  return (dispatch, getState) => {
		const cart = getState().cart.cart || {};

		if (data.cart && data.cart !== "{}") {
			// TO DO: Check here if UUID exists now
			data.cart = JSON.parse(data.cart);
			Object.keys(data.cart).map(uuid => {
				if (cart[uuid] === undefined && data.cart[uuid]>0)
					cart[uuid] = data.cart[uuid];
			})
			dispatch(storeCart(cart));
			dispatch(saveCart(cart, userObj));
			delete data.cart;
		}
		dispatch(storeUserDataInStore(data));
	}
};

export const storeUserDataInStore = (data) => {
	return {
    type: STORE_USER_DATA,
    data,
  };
}

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
