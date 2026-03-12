// Pretty easy code, right?
let _self = this;
const rs = GetRootScope();
let _modPath;
this.loadLanguage = function (lang) {
    $.getJSON(_modPath + '/locales/' + lang + '.json',
            function (jsonData) {
                $.each(jsonData, function (name, value) {
                    GetRootScope().Language[name] = value;
                });

                GetRootScope().settings.nitrosoft_2020.language = lang;
            }
    )
    .fail(function () {
        _self.loadLanguage('en');
        rs.settings.nitrosoft_2020.language = 'en';
    });

    return;
};


exports.initialize = (modPath) => {
    FrameworkNames['CuteFramework5.0'] = 'CuteFramework5.0';
    Frameworks.push({
    order: 10,
    name: 'CuteFramework5.0',
    licenseCost: 95e6,
    researchPoints: 40000,
    pricePerUser: 1e-5,
    cuPerMs: .000001,
    logoPath: "images/logos/frameworks/cuteframework.png",
    maxFeatures: 20,
    maxFeatureLevel: 300e2
    });
    _modPath = modPath;
};

exports.onBackgroundWorkerStart = () => {
    FrameworkNames['CuteFramework5.0'] = 'CuteFramework5.0';
    Frameworks.push({
    order: 10,
    name: 'CuteFramework5.0',
    licenseCost: 95e6,
    researchPoints: 30000,
    pricePerUser: 1e-5,
    cuPerMs: .000001,
    logoPath: "app/mods/LlamaInc2023/thumbnail.png",
    maxFeatures: 20,
    maxFeatureLevel: 300e2
    });
};

ResearchItemNames.CuteFramework5 = "CuteFramework5.0";

  ResearchItems.push({
      name: "CuteFramework5.0",
      category: ResearchCategories.Frameworks,
      points: 30000,
      unlockType: "Framework"
  })


exports.onLoadGame = settings => {if 
    (settings.nitrosoft_2020 !== undefined) {
    _self.loadLanguage(settings.nitrosoft_2020.language);
} else {

    settings.nitrosoft_2020 = {language: rs.options.language};
    _self.loadLanguage(rs.options.language);
}};
        
exports.onNewHour = settings => {};
exports.onNewDay = settings =>  {};
exports.onUnsubscribe = done => {};