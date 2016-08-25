# Twitter Clone #

#### Simple Twitter-like application that features AJAX requests for user searches, creating tweets/chirps, and following users ####

### Deploy offline ###
* Download/clone repo, unzip, cd into project root directory
* you might need to run webpack -w ./frontend/twitter.js ./bundle.js
* if webpack throws an error along the lines of:
**ERROR in multi main Module not found:**, then
create a blank file called *bundle.js* in the root directory. (the actual bundle.js and its bundle.js.map appears in the app/assets/javascripts)
* this project utilizes the seralizeJSON method by Mario Izquierdo, find it [here][mi] and place in vendor/assets/javascripts if it is missing
* in the event of a PG::ConnectionBad error, comment out the host:localhost line in your config/database.yml file like so:

```
default: &default
  adapter: postgresql
  # host: localhost
  pool: 5
  timeout: 5000
```

* run rails server
* open localhost:3000 (default port) and enjoy

[mi]: https://github.com/marioizquierdo/jquery.serializeJSON
