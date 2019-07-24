/* MMM2 Module */


Module.register("defacto-product-details",{

    // Default module config.
    defaults: {
            APIkey: "GETYOUROWNKEY", // API key from food 2 fork
            startText:"Ürün Detayı için Lütfen Barkodunu Okutunuz",
            //updateInterval: 3600 * 1000, // every hour
            updateInterval: 100 * 1000, // 100 sn ye de bır
            animationSpeed: 1000,
            listSize: 1,
            maxTitleSize: 40,
            fade: true,
            fadePoint: 0.25, // Start on 1/4th of the list.
            initialLoadDelay: 2500, // 2.5 seconds delay.
            retryDelay: 2500,

            // apiSearch: "http://localhost:3000/api/products/top10",
            apiSearch: "https://sihirliayna-api.herokuapp.com/api/products/5d3819729872e00017e135ae",
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

    // getTemplate: function () {
// 	return "mmm-defacto-product-details.njk";
// },

// getTemplateData: function () {
// 	return this.config;
// },

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
           // var idxCheck = [];
           var titleLimit = data.title.substring(0,this.config.maxTitleSize);
               
            this.foodlist.push({
                    title: data.title,
                    titleKirpilmis: titleLimit,
                    color: data.color,
                    size: data.size,
                    stock: data.stock,
                    price: data.price,
                    priceCampaign: data.priceCampaign,
                    product_subid: data.product_subid,
                    imaj_URL: data.imaj_URL
                });
              //  idxCheck[count]=count;
           
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
            
            var thead = document.createElement("thead");
            table.appendChild(thead);
            var headtr = document.createElement("tr");
            thead.appendChild(headtr);
            var th = document.createElement("th");
            th.colSpan = 3;
            th.innerHTML = " "; // "Ürün Detayları";
            thead.appendChild(th);


            for (var l in this.foodlist) {
                    var food = this.foodlist[l];
                    
                    var rowUrunAdi = document.createElement("tr");
                    table.appendChild(rowUrunAdi);
                    var urunAdiCell = document.createElement("td");
                    urunAdiCell.className = "name";
                    urunAdiCell.innerHTML = "Ürün Adı:";
                    rowUrunAdi.appendChild(urunAdiCell);
                    var urunAdiCellValue = document.createElement("td");
                    urunAdiCellValue.innerHTML = food.titleKirpilmis;
                    rowUrunAdi.appendChild(urunAdiCellValue);
                    
                    var urunImgCellValue = document.createElement("td");
                    urunImgCellValue.rowSpan = 4;
                    var img = "<img src='" + food.imaj_URL + "' height='300' width='150'>";
                    urunImgCellValue.innerHTML = img;
                    rowUrunAdi.appendChild(urunImgCellValue);



                    var rowUrunRengi = document.createElement("tr");
                    table.appendChild(rowUrunRengi);
                    var urunRengiCell = document.createElement("td");
                    urunRengiCell.className = "name";
                    urunRengiCell.innerHTML = "Rengi:";
                    rowUrunRengi.appendChild(urunRengiCell);
                    var urunRengiCellValue = document.createElement("td");
                    urunRengiCellValue.innerHTML = food.color;
                    rowUrunRengi.appendChild(urunRengiCellValue);


                    
                    var rowUrunBedeni = document.createElement("tr");
                    table.appendChild(rowUrunBedeni);
                    var urunbedeniCell = document.createElement("td");
                    urunbedeniCell.className = "name";
                    urunbedeniCell.innerHTML = "Bedeni:";
                    rowUrunBedeni.appendChild(urunbedeniCell);
                    var urunbedeniCellValue = document.createElement("td");
                    urunbedeniCellValue.innerHTML = food.size;
                    rowUrunBedeni.appendChild(urunbedeniCellValue);



                    var rowUrunFiyati = document.createElement("tr");
                    table.appendChild(rowUrunFiyati);
                    var urunFiyatCell = document.createElement("td");
                    urunFiyatCell.className = "name";
                    urunFiyatCell.innerHTML = "Fiyatı:";
                    rowUrunFiyati.appendChild(urunFiyatCell);
                    var urunFiyatCellValue = document.createElement("td");
                    urunFiyatCellValue.innerHTML = food.price;
                    rowUrunFiyati.appendChild(urunFiyatCellValue);


                    // var rowUrunStok = document.createElement("tr");
                    // table.appendChild(rowUrunStok);
                    // var urunStokCell = document.createElement("td");
                    // urunStokCell.className = "name";
                    // urunStokCell.innerHTML = "Stok:";
                    // rowUrunStok.appendChild(urunStokCell);
                    // var urunStokCellValue = document.createElement("td");
                    // urunStokCellValue.innerHTML = food.stock;
                    // rowUrunStok.appendChild(urunStokCellValue);

            }

            return table;
    }
}
);
