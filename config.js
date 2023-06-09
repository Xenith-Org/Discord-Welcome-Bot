const { ActivityType } = require("discord.js");

module.exports = {
    Botconfig: {

        token: "",  //Put your bot token here
        clientid: "", //Put your bot client id here
        guildid: "", //Put your guild(server) id here
        channelid: "", //Put your channel id here ,where the welcome message should be sent

    },


    Image: {

        background: "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0", //Put your background image url here
        titlemessagecolor: "#ffffff",   //Put your title message color here
        description: "Welcome to this server, go read the rules please!",  //Put your description here (description is the small text in the image)
        descriptioncolor: "#ffffff",  //Put your description color here
        bordercolor: "#2a2e35",  //Put your image border color here
        avatarbordercolor: "#2a2e35",  //Put your avatar border color here
        overlayopacity: 0.4,  //Put the overlay opacity here (0.4 is recommended)

    },

    Presence: {
        status: "dnd", //Put your bot status here (online, idle, dnd, invisible)
        activity: "your server", //Put your bot activity here (playing, streaming, listening, watching)
        type: ActivityType.Watching, //Put your bot activity type here (PLAYING, STREAMING, LISTENING, WATCHING)
    },
}