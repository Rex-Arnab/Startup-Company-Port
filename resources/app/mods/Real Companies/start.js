let _modPath, competitorproducts;
// ${_modPath}
exports.initialize = (modPath) => {
    _modPath = modPath;
    competitorproducts = [
        {logoPath: `${modPath}companies/video_youtube.png`, name: 'YouTube'},
        {logoPath: `${modPath}companies/video_vimeo.png`, name: 'Vimeo'},
        {logoPath: `${modPath}companies/video_dailymotion.png`, name: 'Dailymotion'},
        {logoPath: `${modPath}companies/social_facebook.png`, name: 'Facebook'},
        {logoPath: `${modPath}companies/social_twitter.png`, name: 'Twitter'},
        {logoPath: `${modPath}companies/social_reddit.png`, name: 'Reddit'},
        {logoPath: `${modPath}companies/social_vk.png`, name: 'VK'},
        {logoPath: `${modPath}companies/social_whatsapp.png`, name: 'WhatsApp'},
        {logoPath: `${modPath}companies/social_tumblr.png`, name: 'Tumblr'},
        {logoPath: `${modPath}companies/social_wechat.png`, name: 'WeChat'},
        {logoPath: `${modPath}companies/streaming_netflix.png`, name: 'Netflix'},
        {logoPath: `${modPath}companies/streaming_twitch.png`, name: 'Twitch'},
        {logoPath: `${modPath}companies/streaming_smashcast.png`, name: 'Smashcast.tv'},
        {logoPath: `${modPath}companies/shopping_amazon.png`, name: 'Amazon'},
        {logoPath: `${modPath}companies/shopping_ebay.png`, name: 'eBay'},
        {logoPath: `${modPath}companies/shopping_alibaba.png`, name: 'Alibaba'},
        {logoPath: `${modPath}companies/video_metacafe.png`, name: 'Metacafe'},
        {logoPath: `${modPath}companies/video_watch.png`, name: 'Watch'},
        {logoPath: `${modPath}companies/video_vevo.png`, name: 'Vevo'},
        {logoPath: `${modPath}companies/video_veoh.png`, name: 'Veoh'},
        {logoPath: `${modPath}companies/video_vidme.png`, name: 'Vidme'},
        {logoPath: `${modPath}companies/video_igtv.png`, name: 'IGTV'},
        {logoPath: `${modPath}companies/video_vine.png`, name: 'Vine'},
        {logoPath: `${modPath}companies/social_vero.png`, name: 'Vero'},
        {logoPath: `${modPath}companies/social_instagram.png`, name: 'Instagram'},
        {logoPath: `${modPath}companies/social_snapchat.png`, name: 'Snapchat'},
        {logoPath: `${modPath}companies/streaming_mixer.png`, name: 'Mixer'},
        {logoPath: `${modPath}companies/streaming_picarto.png`, name: 'Picarto.tv'},
        {logoPath: `${modPath}companies/streaming_crunchyroll.png`, name: 'Crunchyroll'},
        {logoPath: `${modPath}companies/streaming_periscope.png`, name: 'Periscope'},
        {logoPath: `${modPath}companies/streaming_hulu.png`, name: 'Hulu'},
        {logoPath: `${modPath}companies/streaming_primevideo.png`, name: 'Amazon Video'},
        {logoPath: `${modPath}companies/streaming_rakuten.png`, name: 'Rakuten.tv'},
        {logoPath: `${modPath}companies/shopping_asos.png`, name: 'ASOS'},
        {logoPath: `${modPath}companies/shopping_etsy.png`, name: 'Etsy'},
        {logoPath: `${modPath}companies/shopping_target.png`, name: 'Target'},
        {logoPath: `${modPath}companies/shopping_bestbuy.png`, name: 'Best Buy'},
        {logoPath: `${modPath}companies/shopping_wish.png`, name: 'Wish'},
        {logoPath: `${modPath}companies/shopping_walmart.png`, name: 'Walmart'},
        {logoPath: `${modPath}companies/dating_meetic.png`, name: 'Meetic'},
        {logoPath: `${modPath}companies/dating_bumble.png`, name: 'Bumble'},
        {logoPath: `${modPath}companies/dating_friendfinder.png`, name: 'Adult FriendFinder'},
        {logoPath: `${modPath}companies/dating_okcupid.png`, name: 'OkCupid'},
        {logoPath: `${modPath}companies/dating_tinder.png`, name: 'Tinder'},
        {logoPath: `${modPath}companies/dating_badoo.png`, name: 'Badoo'},
        {logoPath: `${modPath}companies/dating_madison.png`, name: 'Ashley Madison'},
        {logoPath: `${modPath}companies/dating_zoosk.png`, name: 'Zoosk'},
        {logoPath: `${modPath}companies/dating_pof.png`, name: 'Plenty of Fish'},
        {logoPath: `${modPath}companies/dating_match.png`, name: 'Match.com'},
        {logoPath: `${modPath}companies/gaming_battlenet.png`, name: 'Battle.net'},
        {logoPath: `${modPath}companies/gaming_gog.png`, name: 'Good Old Games'},
        {logoPath: `${modPath}companies/gaming_steam.png`, name: 'Steam'},
        {logoPath: `${modPath}companies/gaming_discord.png`, name: 'Discord'},
        {logoPath: `${modPath}companies/gaming_greenmangaming.png`, name: 'Green Man Gaming'},
        {logoPath: `${modPath}companies/gaming_epic.png`, name: 'Epic Games Store'},
        {logoPath: `${modPath}companies/gaming_origin.png`, name: 'Origin'},
        {logoPath: `${modPath}companies/gaming_uplay.png`, name: 'Uplay'},
        {logoPath: `${modPath}companies/gaming_itchio.png`, name: 'itch.io'},
        {logoPath: `${modPath}companies/gaming_microsoft.png`, name: 'Microsoft Store'},];
        applyCompanyName(competitorproducts, CompetitorProducts)
    }, 
exports.onLoadGame = settings => {
    GetRootScope().settings.CompanyName = true;
    if (settings) applyCompanyName(competitorproducts, settings.competitorProducts);
    console.log(orig(settings))
}, 
exports.onNewHour = settings => {}, 
exports.onNewDay = settings => {}, 
exports.onUnsubscribe = done => {
    let savegames = Helpers.GetSaveGames();

    savegames.forEach((save, index) => Helpers.LoadJsonFile(save.fileName, settings => {
        //TODO: Clean up settings object
        if (settings.CompanyName !== undefined) {
            delete settings.CompanyName;
            settings.competitorProducts = orig(settings);
            Helpers.SaveJsonToFile(sg.fileName, settings);
        }
        
        if (index === savegames.length - 1) {
            done();
        }
    }));
};

const applyCompanyName = (source, target) => {
    target.forEach(c => {
        c.logoOld = c.logoOld === undefined ? c.logoPath : c.logoOld;
        c.nameOld = c.nameOld === undefined ? c.name : c.nameOld;
    });
    target.map((it, ix) => Object.assign(it, source[ix]));
}

const orig = (settings) => {
    const o = settings.competitorProducts.map(c => { return { name: c.nameOld, logoPath: c.logoOld } });
    let n = _.cloneDeep(settings.competitorProducts);
    applyCompanyName(o, n);
    n.forEach(c => {
        delete n.logoOld;
        delete n.nameOld;
    });
    return n;
}