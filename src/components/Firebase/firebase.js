import app from "firebase/app";
import 'firebase/auth';
import { firebaseConfig } from "../../serverConfig";

class Firebase {
  constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		app.auth().languageCode = 'it';
	}
}
export default Firebase;
