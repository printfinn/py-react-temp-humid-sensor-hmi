# Chipsee Python + React Temperature and Humidity Modbus Sensor Demo

This is the source code of the YouTube video: https://youtu.be/LN7sZzeXmg8?si=7sS2U6yUnaIPMjJp

![youtube-image](https://github.com/printfinn/py-react-temp-humid-sensor-hmi/assets/10386624/ca09e09f-76d2-4c6c-8e14-883c3afee325)

In the `temp_humid_sensor` folder, it's the Python backend code, made with Flask, don't forget to change the tty port if you're testing on your own machine. If you don't have a modbus sensor connected, you can comment out the serial port code, and return a dummy value in `return jsonify` for testing purpose.

In the `temp_humid_react` folder, it's the ReactJS frontend code, don't forget to change the IP address in `useEffect` to point it to your Python backend IP.

# Usage:

## Python Part
```
cd temp_humid_sensor
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt 
flask run --debug
```

If you have connected every wire correctly, now you can test with manual `curl` to make sure the Python server works:

```
curl 127.0.0.1:5000

should return:
{
  "humidity": 55,
  "temperature": 5
}
```

## React Part

```
cd temp_humid_react
npm install
npm run dev
```

You should see vite is running in green text.

## Open Browser

In your 5 inch Chipsee panel PC.

Open Firefox browser, go to `localhost:5173` to open the webpage, it should be displayed on the screen now.

# Note

There might be some bugs in CSS displaying, such as a value is >=100, but the functions should work without a problem.

License: MIT
