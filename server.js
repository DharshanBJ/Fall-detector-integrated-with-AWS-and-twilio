const express = require(&#39;express&#39;)
const app = express()
var mysql = require(&#39;mysql&#39;);
var con = mysql.createConnection({
  host: &quot;localhost&quot;,
  user: &quot;root&quot;,
  password: &quot;jmvtyson&quot;
});
con.connect(function(err) {
if (err) throw err;
console.log(&quot;Connected!&quot;);
});
var txt = &quot;&quot;;
var x;

var sql = &quot;select * from testing.fall&quot;
app.get(&#39;/getTesting&#39;, (req, res) =&gt; {
  console.log(&#39;inside get request&#39;)
  con.query(sql, function (err, result) {
console.log(result[1].type)
  txt += &quot;&lt;!DOCTYPE htl&gt; &lt;html&gt; &lt;body&gt;&quot;
txt += &quot;&lt;script type=&#39;text/javascript&#39;&gt;document.body.innerHTML = &#39;&#39;;&lt;/script&gt;&quot;
txt+= &quot;&lt;script src=&#39;https://code.jquery.com/jquery-3.2.1.min.js&#39;&gt;&lt;/script&gt;&quot;
txt+= &quot;&lt;h1 class=&#39;display-3&#39; style =&#39;text-align:center&#39; &gt;Data Table&lt;/h1&gt;&quot;
txt+= &quot;&lt;link rel=&#39;stylesheet&#39; href=&#39;http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css&#39;&gt; &lt;script
src=&#39;//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js&#39;&gt;&lt;/script&gt;&quot;
txt += &quot;&lt;table border=&#39;1&#39; class =&#39;table table-bordered&#39; style=&#39;width:75%; margin-top: 25px; margin-left: auto;margin-
right: auto;&#39;&gt;&quot;
txt += &quot;&lt;tr&gt;&lt;th&gt;#&lt;/th&gt;&lt;th&gt;Name&lt;/th&gt;&quot;;
        txt += &quot;&lt;th&gt;Event&lt;/th&gt;&quot;;
        txt += &quot;&lt;th&gt;Time_of_trigger&lt;/th&gt;&lt;/tr&gt;&quot;;
for (x in result) {
    txt+= &quot;&lt;tr&gt;&lt;td&gt;&quot; + x+ &quot;&lt;/td&gt;&quot;
            txt += &quot;&lt;td&gt;&quot; + result[x].name + &quot;&lt;/td&gt;&quot;;
            txt += &quot;&lt;td&gt;&quot; + result[x].type+ &quot;&lt;/td&gt;&quot;;
            txt += &quot;&lt;td&gt;&quot; + result[x].time_of_trigger+ &quot;&lt;/td&gt;&lt;/tr&gt;&quot;;
        }
        txt += &quot;&lt;/table&gt;&lt;/body&gt;&lt;/html&gt;&quot; 
    if (err) throw err;
    console.log(&quot;Result: &quot; + result);
res.send(txt)
  })
console.log(txt);
  //res.send(txt)
})
app.get(&#39;/getTesting1&#39;, (req, res) =&gt; {
  console.log(&#39;inside get request&#39;)
  res.send(&#39;HEY false alaram!&#39;)
})
app.post(&#39;/fallDetected&#39;, (req, res) =&gt; {
const accountSid = &#39;ACa29d0dde57bd74f45eb51418b0765243&#39;;
const authToken = &#39;1bab241af25530c43c5ffdd39f670945&#39;;
const client = require(&#39;twilio&#39;)(accountSid, authToken);
client.messages.create({
  body: &#39;Warning: The person with name John has fallen&#39;,
  to: &#39;+19498806256&#39;,
  from: &#39;+14158739600&#39;,
  
})
.then((message) =&gt; process.stdout.write(message.sid)); 
var sql = &quot;use testing;&quot;
var dateTime = require(&#39;node-datetime&#39;);
var dt = dateTime.create();
var nDate = new Date().toISOString();
sql = &quot;INSERT INTO testing.fall (name, type, time_of_trigger) VALUES (&#39;John&#39;, &#39;Fall&#39;,&quot; +   &quot;&#39;&quot;+ nDate +&quot;&#39;&quot; + &quot;)&quot;;
//con.connect(function(err) {
  //if (err) throw err;
  console.log(&quot;Connected!&quot;);
  console.log(sql);
  con.query( sql, function (err, result) {
    if (err) throw err;
    console.log(&quot;Result: &quot; + result);
  })
  //});
 res.send(&#39;HEY inside post!&#39;)
})

app.post(&#39;/falseAlaram&#39;, (req, res) =&gt; {
const accountSid1 = &#39;ACa29d0dde57bd74f45eb51418b0765243&#39;;
const authToken1 = &#39;1bab241af25530c43c5ffdd39f670945&#39;;
const client = require(&#39;twilio&#39;)(accountSid1, authToken1);
client.messages.create({
  body: &#39;Sorry, Please Ignore the previous warning&#39;,
  to: &#39;+19498806256&#39;,
  from: &#39;+14158739600&#39;,
})
.then((message) =&gt; process.stdout.write(message.sid));
var sql = &quot;use testing;&quot;
var dateTime = require(&#39;node-datetime&#39;);
var dt = dateTime.create();
var nDate = new Date().toISOString();
sql = &quot;INSERT INTO testing.fall (name, type, time_of_trigger) VALUES (&#39;John&#39;, &#39;False Alaram&#39;,&quot; +   &quot;&#39;&quot;+ nDate +&quot;&#39;&quot; + &quot;)&quot;;
//con.connect(function(err) {
  //if (err) throw err;
  console.log(&quot;Connected!&quot;);
  console.log(sql);
  con.query( sql, function (err, result) {
    if (err) throw err;
    console.log(&quot;Result: &quot; + result);
  })
 // });
 res.send(&#39;HEY inside post!&#39;)
})