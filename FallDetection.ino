#include &lt;ESP8266HTTPClient.h&gt;
#include &lt;ESP8266WiFi.h&gt;
#include &lt;SPI.h&gt;
#include &lt;math.h&gt;
#include &lt;SparkFunLSM6DS3.h&gt;
//#include &lt;ESP8266WiFi.h&gt;
//#include &lt;WiFiClientSecure.h&gt;
#include &lt;WiFiUdp.h&gt;
#include &lt;Wire.h&gt;

#define BUTTON_PIN 5
//#define BUTTON_PIN_RESET 4
#define LED_PIN 4
bool button_pressed;
bool fall_detected;
LSM6DS3 myIMU;
void setup() {
Serial.begin(9600);
pinMode(BUTTON_PIN, INPUT);
pinMode(LED_PIN, OUTPUT);
button_pressed = false;

fall_detected = false;
myIMU.begin();
Wire.begin();

// WiFi.begin(&quot;Free Wifi&quot;, &quot;aslongasyoupayforit&quot;); //WiFi connection
// WiFi.begin(&quot;League of Shadows&quot;, &quot;parkWest@23C&quot;); //WiFi connection
WiFi.begin(&quot;UCInet Mobile Access&quot;, &quot;&quot;); //WiFi connection

while (WiFi.status() != WL_CONNECTED) { //Wait for the WiFI connection completion
delay(500);
Serial.println(&quot;Waiting for connection&quot;);
}

if(WiFi.status()== WL_CONNECTED){ //Check WiFi connection status
Serial.println(&quot;Connected&quot;);
} else{
Serial.println(&quot;Error in WiFi connection&quot;);
}
}

void makeHttpCall(){
HTTPClient http; //Declare object of class HTTPClient
http.begin(&quot;http://18.217.138.163:3000/fallDetected&quot;); //Specify your AWS server
IP
http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;); //Specify content-type header

int httpCode = http.POST(&quot;&quot;);
String payload = http.getString(); //Get the response payload
Serial.println(payload);
Serial.println(httpCode); //Print HTTP return code

http.end(); //Close connection
}
void makeHttpCallForFalse(){

HTTPClient http; //Declare object of class HTTPClient

http.begin(&quot;http://18.217.138.163:3000/falseAlaram&quot;); //Specify your AWS server
IP
http.addHeader(&quot;Content-Type&quot;, &quot;application/json&quot;); //Specify content-type header
int httpCode = http.POST(&quot;&quot;);
String payload = http.getString(); //Get the response payload
Serial.println(payload);
Serial.println(httpCode); //Print HTTP return code

http.end(); //Close connection


}
void loop() {
float x = myIMU.readFloatAccelX();
float y = myIMU.readFloatAccelY();
float z = myIMU.readFloatAccelZ();

float gx= myIMU.readFloatGyroX();
float gy = myIMU.readFloatGyroY();
float gz = myIMU.readFloatGyroZ();

if (HIGH == digitalRead(BUTTON_PIN)) {
makeHttpCallForFalse();
fall_detected = false;
}

if((gy &gt; 350 || (y &gt; 1 || y&lt; -1) || z &gt; 1 ) &amp;&amp; !fall_detected){
Serial.println( &quot;gy&quot;);
Serial.println( gy);
Serial.println( &quot;grandpa has fallen - forward&quot;);
makeHttpCall();
fall_detected = true;
for(int i =0; i&lt;4;i++){
digitalWrite(LED_PIN, HIGH);
delay(200);
digitalWrite(LED_PIN, LOW);
delay(200);
}
}

delay(150);
}
