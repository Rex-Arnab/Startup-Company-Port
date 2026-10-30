let languagesModule;
let missingLib = false;
try {
    const lm = require('../languages_module/languages.module.min');
    languagesModule = new lm.LanguagesModule();
} catch (exception) {
    missingLib = true;
}

Modding.setMenuItem({
    name: 'newbenefits',
    tooltip: "Language Settings - New Benefits",
    tooltipPosition: 'top',
    faIcon: 'fa-cog',
    badgeCount: 0,
});



exports.initialize = (modPath) => {
    _modPath = modPath;

    exports.views = [{
        name: 'newbenefits',
        viewPath: _modPath + 'languagesettings.html',
        controller: ["$scope", "$rootScope", "$timeout", function($scope, $rootScope, $timeout) {
            $('.newbenefits-mainview').parent().css("width", 1124);
            $scope.languagesModule = languagesModule;

        }]
    }]

    if (missingLib === false) {
        // Define view name
        let viewName = 'newbenefits';
        languagesModule.init(this, [{
            name: 'English',
            code: 'en'
        }, {
            name: 'Spanish',
            code: 'es'
        }, ], viewName);

        BenefitNames.benefit_houserent = "benefit_houserent";
        BenefitNames.benefit_freebills = "benefit_freebills";
        BenefitNames.benefit_freecomputers = "benefit_freecomputers";
        BenefitNames.benefit_freerepair = "benefit_freerepair";
        BenefitNames.benefit_theatertickets = "benefit_theatertickets";
        BenefitNames.benefit_pizzadelivery = "benefit_pizzadelivery";
        ResearchItemNames.pack_1 = "pack_1";


        ResearchItems.push({
            name: ResearchItemNames.pack_1,
            category: ResearchCategories.Office,
            points: 200,
            unlockType: "Benefits",
            unlocks: [BenefitNames.benefit_houserent, BenefitNames.benefit_freebills, BenefitNames.benefit_freecomputers, BenefitNames.benefit_freerepair, BenefitNames.benefit_theatertickets, BenefitNames.benefit_pizzadelivery]
        })

        Benefits.push({
            id: "37045f22-d523-4769-8660-fb00af98becc",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_houserent,
            description: "benefit_houserent_description",
            pricePerEmployee: 1000,
            fixedPrice: 0,
            bonus: 100,
            active: 0,
            faIcon: "fa-home"
        })


        Benefits.push({
            id: "c829dce7-8803-45d8-bf8c-58afff68ad35",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_freebills,
            description: "benefit_freebills_description",
            pricePerEmployee: 400,
            fixedPrice: 0,
            bonus: 60,
            active: 0,
            faIcon: "fa-money"
        })
        Benefits.push({
            id: "b0435675-1f84-4682-9d01-76fa329c1454",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_freecomputers,
            description: "benefit_freecomputers_description",
            pricePerEmployee: 500,
            fixedPrice: 0,
            bonus: 40,
            active: 0,
            faIcon: "fa fa-keyboard-o"
        })
        Benefits.push({
            id: "52000bd7-9347-4f6f-9851-98f1792d8532",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_freerepair,
            description: "benefit_freerepair_description",
            pricePerEmployee: 30,
            fixedPrice: 0,
            bonus: 30,
            active: 0,
            faIcon: "fa fa-wrench"
        })
        Benefits.push({
            id: "05f0e265-63ac-4962-a748-99f9810b041b",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_theatertickets,
            description: "benefit_theatertickets_description",
            pricePerEmployee: 10,
            fixedPrice: 0,
            bonus: 50,
            active: 0,
            faIcon: "fa-ticket"
        })
        Benefits.push({
            id: "398455ef-7c05-4c95-b7fe-78f200a86926",
            level: Enums.EmployeeLevels.Beginner,
            name: BenefitNames.benefit_pizzadelivery,
            description: "benefit_pizzadelivery_description",
            pricePerEmployee: 10,
            fixedPrice: 0,
            bonus: 50,
            active: 0,
            faIcon: "fa-cutlery"
        })
    exports.onLoadGame = (settings) => {
        // Init Languages module settings
        if (missingLib === false) {
            languagesModule.initSettings(settings);
        } else {
            let _self = this;
            let impactedMod = Game.mods.find(function(m) {
                return m.id === _self.modId;
            });

            rs.showMessage(``, impactedMod.name + ' mod requires "Languages Module" mod.<br><br>You must subscribe to it in Startup Company\'s Workshop.', function() {
                // Reset the image to avoid display it in the futures showMessage()
                rs.Message.image = null;
                console.error(impactedMod.name + ' mod requires "Languages Module" mod. You must subscribe to it in Startup Company\'s Workshop.');
            }, impactedMod.modPath + impactedMod.imageUrl);
        }
    }

}
exports.onNewHour = settings => {};
exports.onNewDay = settings => {};
exports.onUnsubscribe = done => {
    let savegames = Helpers.GetSaveGames();

    savegames.forEach((savegame, index) => {
        let settings = Helpers.LoadJsonFile(savegame.fileName);

        delete settings.newbenefits;
        let ids = ["37045f22-d523-4769-8660-fb00af98becc", "c829dce7-8803-45d8-bf8c-58afff68ad35", "b0435675-1f84-4682-9d01-76fa329c1454", "52000bd7-9347-4f6f-9851-98f1792d8532", "05f0e265-63ac-4962-a748-99f9810b041b", "398455ef-7c05-4c95-b7fe-78f200a86926"];

        if (GetRootScope().settings.activatedBenefits.includes(ids)) {
            _.remove(GetRootScope().settings.activatedBenefits, function(value) {
                return value == benefitId;
            });
        };
        Helpers.SaveJsonToFile(savegame.fileName, settings);
        if (index === savegames.length - 1) {
            done();
        }
    });
}
}