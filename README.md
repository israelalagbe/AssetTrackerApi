# Assets Tracker API

## Design and implement a node-js service that meets these criterias.

### Definitions:
* Client: consumers of the service interested in monitoring and tracking the position of an asset.
* Asset: any gps enabled item that periodically broadcasts its current position to this service

### Expectations:

* Clients connect to the service using their current location and maintains a persistent connection
* Clients will connect using websocket while the asset position will be updated via REST endpoint
* Assets are uniquely identified by a reference, and clients will always provide an asset’s reference when connecting
* Asset keeps broadcasting its current location periodically, the service should:
    * Rebroadcast the current location of any asset to all connected clients interested in listening to that asset. There should be at most one broadcast sent to a client within a 5 seconds window i.e throttle rebroadcasts by 5 seconds. I.e at most one rebroadcast every 5 seconds.
    * Whenever any asset is 100 meters away from any or all connected clients interested in that asset, Send a special “proximity” message to all matched clients. This “proximity” message should be sent once for every additional 10 meters closeness. Ie it should send the message to a client when it’s 100, 90, 80, 70 …. Meters away from the client till 0. But not in between the values.


#### Example Behaviour Scenario.
Three clients are A, B and C are connected to the service and listening for their asset proximity, the first two clients(A and B) stay 100 meters apart while the last client(C) is in the same location as the first. These three clients will always get notified when the asset position changes. In this scenario, the three clients are observing the same Asset

When the asset is 100 meters away from the location of the first client, both the first and third client get notified about this proximity since they are on the same location, while the 2nd client is still 200 meters away at this point so no notification.

### Test Criteria:
* Use feature tests to demonstrate that the service meets the above criterias
* Typescript is preferred over Javascript
* We prefer slim controllers/transports, fat helpers/interactors

### How do I submit? ###
* Create a branch, implement your solution and send a pull request (PR) to this repository
* Create a ReadMe file with `firstname-lastname.md` (where firstname and lastname are your 
  first and last name respectively) where you add relevant information on how to setup/run/test your submission
