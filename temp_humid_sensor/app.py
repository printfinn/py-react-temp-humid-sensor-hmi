from flask import Flask, jsonify
from flask_cors import CORS
from pymodbus.client import ModbusSerialClient
import atexit

app = Flask(__name__)
CORS(app)

client = ModbusSerialClient(port='/dev/ttyS3', timeout=2, baudrate=9600, bytesize=8, parity="N", stopbits=1)
client.connect()

@app.route("/")
def home():
    """
    Read temperature and humidity values from Modbus sensor, you can get this result by
    sending a GET request to the root URL of localhost:5000, e.g.: 
    $ curl localhost:5000/
    """
    rr = client.read_holding_registers(0, 2, 0x01)
    temperature_register = rr.registers[0]
    humidity_register = rr.registers[1]

    # Convert negative temperature value with its two's complement
    if temperature_register >= 0x8000:
        temperature_register -= 0x10000

    temperature = temperature_register / 10.0
    humidity = humidity_register / 10.0

    return jsonify({ "temperature": temperature, "humidity": humidity })

@atexit.register
def device_disconnect():
    print("Closing Modbus Connection")
    client.close()