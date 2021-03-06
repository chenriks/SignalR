﻿(function ($, window) {    
    // These values are updated via the csproj based on configuration values passed into its build
    window.document.testUrl = /*URL*/'auto'/*URL*/;
    window.document.commandLineTest = /*CMDLineTest*/false/*CMDLineTest*/;

    // Configure masks to help mock foreverFrame transports and ajaxSends to be used for network mocking
    $.signalR.transports.foreverFrame.networkLoss = function () {
        $("iframe").each(function () {
            if (this.stop) {
                this.stop();
            } else {
                try {
                    cw = this.contentWindow || this.contentDocument;
                    if (cw.document && cw.document.execCommand) {
                        cw.document.execCommand("Stop");
                    }
                }
                catch (e) {
                    console.log("Network Mock Error occured, unable to stop iframe.  Message = " + e.message);
                }
            }
            $(this).triggerHandler("readystatechange");
        });
    };

    $.network.mask.create($.signalR.transports.foreverFrame, "networkLoss", "receive");

})($, window);