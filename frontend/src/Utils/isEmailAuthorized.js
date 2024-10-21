import axios from 'axios';

// Function to check if the user's email is authorized (i.e., subscribed)
export async function isEmailAuthorized(email) {
  try {
    // Make an API request to check if the user is subscribed
    const response = await axios.get('http://127.0.0.1:8000/api/check-subscription/', {
      params: { email }
    });
    
    // Return true if the user is subscribed, otherwise false
    return response.data.is_subscribed === true;
  } catch (error) {
    console.error('Error checking email authorization:', error);
    return false;
  }
}

export async function sendDataUser(email) {
  try {
    // Make a GET request to the backend API to fetch user data
    const response = await axios.get('http://127.0.0.1:8000/api/check-subscription/', {
      params: {
        email: email,
      },
    });

    if (response.status === 200) {
      return response.data; // Return the user data from the backend
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Return null or handle error appropriately
  }
}

// Since the `isEmailEarlyAdopterAuthorized`, `freeTrialAuthEmail`, `accessTypeConfidia` functions were related to JSON file data, you don't need them in the new logic.









/*import ListeMailUser from "../JSON/AccessListe.json";

export function isEmailAuthorized(email) {
  return ListeMailUser.some((entry) => entry.email === email);
}
export function isEmailEarlyAdopterAuthorized(email, earlyAdopterKey) {
  const user = ListeMailUser.find(
    (user) => user.email === email && user.key_earlyAdopter
  );
  return user && user.key_earlyAdopter === earlyAdopterKey;
}

export function freeTrialAuthEmail(email) {
  const user = ListeMailUser.find((user) => user.email === email);

  if (!user || !user.key_freeTrial || !user.AccessType) {
    return "sub";
  }

  if (user.key_freeTrial.freeTrial_Activate === "sub") {
    return "sub";
  }
  if (user.key_freeTrial.freeTrial_Activate === "true") {
    return true;
  } else {
    return false;
  }
}

export function accessTypeConfidia(email) {
  const user = ListeMailUser.find((user) => user.email === email);

  if (!user.AccessType) {
  }
}

export function sendDataUser(email) {
  const user = ListeMailUser.find((user) => user.email === email);
  return user;
}*/
