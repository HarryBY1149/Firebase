# Firebase
Firebase homework
My attempt to assign player based on connection status.  ==> Prayers to machine gods go here <===

Prayers failed, trying iterator instead.  ==> More prayers here <==

Prayers continue to be unsuccessful, trying iterator taking snap as data.  Also I hate firebase.

Okay, I got it to work but it's so incredibly convoluted and dumb I'm putting this whole thing in the read.me so you can fully appreciate how dumb it is:
okay, so, first: you can't get a numChildren directly from firebase.  This sucks.  So I made an html div with display: none and id="player" 
text supplied by:  connectionsRef.on("value", function(snap){
                    $("#player").text(snap.numChildren());
                   })
Then I made a global variable i.  
Then I created a timeout function to set i = parseInt($("#player).text());  You need a timeout so the database call can finish before 
    JS tries to assign the variable

Then I put my player number logic on a timeout so it would resolve after the previous time out function to ensure my iterator had a value when the logic went looking for it.

Now the player number is assigned by order of connection.  

There has to be a better way to to do this.


^^^ cleaned that up with a firebase promise statement.  Still ridiculous.