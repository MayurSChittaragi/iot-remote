import axios from "axios";

const writeThingspeak = axios.create({
	baseURL: "https://api.thingspeak.com/update.json",
	params: {
		api_key: "J2N5JV50QT9QRIZJ",
	},
});

const readThingspeak = axios.create({
	baseURL: "https://api.thingspeak.com/channels/1839256/fields/1.json",
	params: {
		api_key: "FWX0XX7TF8EKNG27",
	},
});

export {
	writeThingspeak,
	readThingspeak,
};
