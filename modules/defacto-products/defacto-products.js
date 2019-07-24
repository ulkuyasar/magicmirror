/* MMM2 Module */



Module.register("defacto-products",{

        // Default module config.
        defaults: {
                APIkey: "GETYOUROWNKEY", // API key from food 2 fork
                //updateInterval: 3600 * 1000, // every hour
                updateInterval: 10000 * 1000, // 10000 sn ye de bır
                animationSpeed: 1000,
                listSize: 4,
                maxTitleSize: 40,
                fade: true,
                fadePoint: 0.25, // Start on 1/4th of the list.
                initialLoadDelay: 2500, // 2.5 seconds delay.
                retryDelay: 2500,

                // apiSearch: "http://localhost:3000/api/products/top10",
                apiSearch: "https://sihirliayna-api.herokuapp.com/api/products/top10",
                daysTable: {
                        "1": "natural",
                        "2": "chicken",
                        "3": "vegan",
                        "4": "indian",
                        "5": "japanese",
                        "6": "quick",
                        "0": "vegetarian"
                },
        },

        // Define required scripts.
        getScripts: function() {
                return ["moment.js"];

        },

        // Define required scripts.
        getStyles: function() {
                return ["recipes.css"];
        },

        // Define start sequence.
        start: function() {
                Log.info("Starting module: " + this.name);

                this.loaded = false;
                this.scheduleUpdate(this.config.initialLoadDelay);

                this.updateTimer = null;

        },
        updateRecipes: function() {
                var self = this;
                var d = new Date();
                var n = 2;//d.getDay()
                var rPage = function() { return Math.floor(Math.random() * 4); };
                var pageNum = rPage();
                var pRequest;
                if (pageNum > 0) {
                    pRequest = "&page="+pageNum;
                } else {
                    pRequest="&page=1";
                }
                //var url = this.config.apiSearch + "?key=" + this.config.APIkey + "&q=" + this.config.daysTable[n]+pRequest;
                var url = this.config.apiSearch
                
                self.sendSocketNotification("GET_RECIPE", {config: this.config, url: url});
        },
        
        socketNotificationReceived: function(notification, payload) {
                if(notification === "RECIPE"){
                                this.processRecipe(payload);
                                this.scheduleUpdate();
                }
                
        },

        processRecipe: function(data) {

                this.foodlist = [];
                var idxCheck = [];
                for(count=0; count < this.config.listSize; count++) {
                    var titleLimit = data[count].title.substring(0,this.config.maxTitleSize);
                    this.foodlist.push({
                        title: data[count].title,
                        titleKirpilmis: titleLimit,
                        color: data[count].color,
                        size: data[count].size,
                        stock: data[count].stock,
                        price: data[count].price,
                        priceCampaign: data[count].priceCampaign,
                        product_subid: data[count].product_subid,
                        imaj_URL: data[count].imaj_URL
                    });
                    idxCheck[count]=count;
                }
                this.loaded = true;
                this.updateDom(this.config.animationSpeed);
        },

        scheduleUpdate: function(delay) {
                var nextLoad = this.config.updateInterval;
                if (typeof delay !== "undefined" && delay >= 0) {
                        nextLoad = delay;
                }

                var self = this;
                clearTimeout(this.updateTimer);
                this.updateTimer = setTimeout(function() {
                        self.updateRecipes();
                }, nextLoad);
        },


        // Override dom generator.
        getDom: function() {
                var table = document.createElement("table");
                table.className = "small";

                var rowhead = document.createElement("tr");
                table.appendChild(rowhead);
                var tdURL = document.createElement("td");
                tdURL.innerHTML = "";
                rowhead.appendChild(tdURL);
                var tdAd = document.createElement("td");
                tdAd.innerHTML = "Ürün";
                rowhead.appendChild(tdAd);

                var tdBeden = document.createElement("td");
                tdBeden.innerHTML = "Beden";
                rowhead.appendChild(tdBeden);

                var tdRenk = document.createElement("td");
                tdRenk.innerHTML = "Renk";
                rowhead.appendChild(tdRenk);

                var tdStok = document.createElement("td");
                tdStok.innerHTML = "Stok";
                rowhead.appendChild(tdStok);

                var tdFiyat = document.createElement("td");
                tdFiyat.innerHTML = "Fiyat";
                rowhead.appendChild(tdFiyat);

                var tdKamFiyat = document.createElement("td");
                tdKamFiyat.innerHTML = "Kam.Fiyat";
                rowhead.appendChild(tdKamFiyat);



                for (var l in this.foodlist) {
                        var food = this.foodlist[l];
                        var row = document.createElement("tr");
                        table.appendChild(row);
                        
                        var imgCell = document.createElement("td");
                        var img = "<img src='" + food.imaj_URL + "' height='50' width='50'>";
                        imgCell.innerHTML = img;
                        row.appendChild(imgCell);

                        var dishCell = document.createElement("td");
                        dishCell.className = "name";
                        dishCell.innerHTML = food.titleKirpilmis;
                        row.appendChild(dishCell);

                        var pubCell = document.createElement("td");
                        pubCell.innerHTML = food.size;
                        row.appendChild(pubCell);

                        var colorCell = document.createElement("td");
                        colorCell.innerHTML = food.color;
                        row.appendChild(colorCell);

                        var stockCell = document.createElement("td");
                        stockCell.innerHTML = food.stock;
                        row.appendChild(stockCell);

                        var priceCell = document.createElement("td");
                        priceCell.innerHTML = food.price;
                        row.appendChild(priceCell);

                        var priceCamCell = document.createElement("td");
                        priceCamCell.innerHTML = food.priceCampaign;
                        row.appendChild(priceCamCell);

                        if (this.config.fade && this.config.fadePoint < 1) {
                                if (this.config.fadePoint < 0) {
                                        this.config.fadePoint = 0;
                                }
                                var startingPoint = this.foodlist.length * this.config.fadePoint;
                                var steps = this.foodlist.length - startingPoint;
                                if (l >= startingPoint) {
                                        var currentStep = l - startingPoint;
                                        row.style.opacity = 1 - (1 / steps * currentStep);
                                }
                        }
                    
                }
                console.log("yasar");
                console.log("table = " + table.innerHTML);
                return table;
        }
});
