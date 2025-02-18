var config = {
        address: "localhost", // Address to listen on, can be:
                              // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
                              // - another specific IPv4/6 to listen on a specific interface
                              // - "", "0.0.0.0", "::" to listen on any interface
                              // Default, when address config is left out, is "localhost"
        port: 8080,
        ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
                                                               // or add a specific IPv4 of 192.168.1.5 :
                                                               // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
                                                               // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
                                                               // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

        language: "en",
        timeFormat: 24,
        units: "metric",

        modules: [
                {
                        module: "alert",
                },
                // {
                //      module: "updatenotification",
                //      position: "top_bar"
                // },
                {
                        module: "hellodefacto",
                        position: "top_left"
                },
                {
                        module: "clock",
                        position: "top_right"
                },
 		{
                      module: "cam",
                      position: "fullscreen_below"
                },
                // {
                //      module: "calendar",
                //      header: "US Holidays",
                //      position: "top_left",
                //      config: {
                //              calendars: [
                //                      {
                //                              symbol: "calendar-check",
                //                              url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"                                       }
                //              ]
                //      }
                // },
                // {
                //      module: "compliments",
                //      position: "lower_third"
                // },
                // {
                //      module: 'MMM-DailyDilbert',
                //      position: 'bottom_bar',
                //      config: {
                //              updateInterval : 36000000
                //      }
                //  },
                // {
                //      disabled: false,
                //      module: "MMM-BMW-DS",
                //      position: "bottom_bar",               // bottom_bar is best
                //      config: {
                //              apiKey: "1d27752c533dd7fb38fea9745a31b2a5", // Free API key @ darksky.net
                //              tempUnits: "C", // MUST BE CAPITAL LETTER C or F
                //              lat: '40.994670',
                //              lng: '29.081176',
                //              css: "1", // 1=default, 2=Clean, 3=Lord of the Rings,4=handwriting, 5=Julee, 6=Englebert, "" = returns default css
                //              ownTitle: "Current Conditions",   // Use your own language and statement
                //              playSounds: "yes", // yes = weather sounds, no = no weather sounds
                //              useHeader: false,
                //              header: "Hava Durumu",
                //              maxWidth: "100%",
                //                 }
                //      },


                {
                        module: 'defacto-product-details',
                        position: 'top_left',
                        header: 'DeFacto-Urun Detayları',
                        config: {
                                        APIkey: "896194db00fb1f3f6f71b2fd0dd4da8b", // after creating auser there u can get ur key
                                        listSize: 1
                        }
                },
                {
                        module: 'defacto-products',
                        position: 'bottom_bar',
                        header: 'DeFacto-Urunleri',
                        config: {
                                        APIkey: "896194db00fb1f3f6f71b2fd0dd4da8b", // after creating auser there u can get ur key
                                        listSize: 3
                        }
                }
                ,               
                // {
                //      module: "newsfeed",
                //      position: "bottom_bar",
                //      config: {
                //              feeds: [
                //                      {
                //                              title: "New York Times",
                //                              url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                //                      }
                //              ],
                //              showSourceTitle: true,
                //              showPublishDate: true,
                //              broadcastNewsFeeds: true,
                //              broadcastNewsUpdates: true
                //      }
                // },
        ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}