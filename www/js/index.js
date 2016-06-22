document.addEventListener('deviceready', whenReady, false);


MedsViewModel = function() {
    var self = this;
    self.meds = ko.observableArray([]);
    self.name = ko.observable("Medication name");
    self.taken = ko.observable(false);
    self.Med = function(name, taken) {
        this.medName = ko.observable(name);
        this.medTaken = ko.observable(taken);
    }


    self.addMed = function() {
        self.newMed = new self.Med(self.name(), self.taken());
        self.meds.push(self.newMed);
        console.log(self.meds());
        console.log(self.meds().length);
    }

    self.toggleTaken = function(data) {
        var target = $(event.target);
        if (this.medTaken) {
            this.medTaken = false;
            target.removeClass('checked');
        } else {
            this.medTaken = true;
            target.addClass('checked');
        }
        console.log(this.medTaken);
    }

    self.clearName = function() {
        self.name("");
    }



    self.midnightTask = function() {
        for (var i = 0; i < self.meds.length; i++) {
            self.meds[i].medTaken = false;
        }
        $(".checked").removeClass("checked");
    }

    setTimeout(
        self.midnightTask,
        moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') * 1000
    );


}

function whenReady() {
    StatusBar.backgroundColorByHexString("#03A9F4");

    function initControls() {
        $(".button").on("click", function() {
            $(".button").addClass("pressed");
            setTimeout(function() {
                $(".pressed").removeClass("pressed");
            }, 150);
            navigator.notification.alert("Good job.", midnightTask, "You clicked the button", "Thanks");
        });

    }

    medsVM = new MedsViewModel();
    ko.applyBindings(medsVM, $(".medView")[0]);
    initControls();
});
