When running this website on the WHALE server, these steps were taken as setup:

- Start website itself
    + install forever globally (this allows the server to run as a daemon)
        * `sudo npm install -g forever`
    + Start the server process
        * `sudo forever start web.js`
- Set up data updates
    + WAVE and Competitions data
        * Create a simple bash script for every active cron.&lt;timeslot&gt; folder that exists in /etc/cron.&lt;timeslot&gt; and has these two lines:
            - #!/bin/bash
            - (cd /home/whale_site/ && for i in ./cronjobs/cron.&lt;timeslot&gt;/*.js; do node $i; done)
        * *Make sure it has no file extension* i.e. 'whaleweb-cron-hourly'

