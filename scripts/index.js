const utils = {
    isReady: false,
    
    /**
     * Get raw values from database to append them in your frontend
     */
    ConnectDB() {
        // Do something
    },

    /**
     * Append recieved data into frontend
     * @param {*} data data to read
     */
    AppendData(data) {
        if (data && utils.isReady) {
            var articlesObject = document.getElementById("articles");
            
            // Do Something
        }
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    utils.isReady = true;

    // This is a ready event
    // Try getting the mod data from database and then post it into main page
});