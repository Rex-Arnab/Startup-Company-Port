// Steam/Greenworks stub — native module replaced with no-ops.
// Steam features (achievements, cloud saves, workshop) are disabled.
const EventEmitter = require('events').EventEmitter;

const greenworks = Object.assign(new EventEmitter(), {
    initAPI: () => false,
    isSteamRunning: () => false,
    isSubscribed: () => false,
    getAppId: () => 0,
    getSteamId: () => ({ steamId: null }),
    getAchievementNames: () => [],
    activateAchievement: (_name, success, _error) => { if (success) success(); },
    clearAchievement: (_name, success, _error) => { if (success) success(); },
    getNumberOfAchievements: () => 0,
    readTextFromFile: (_file, _success, error) => { if (error) error(new Error('Steam disabled')); },
    saveTextToFile: (_file, _text, _success, error) => { if (error) error(new Error('Steam disabled')); },
    deleteFile: (_file, _success, error) => { if (error) error(new Error('Steam disabled')); },
    fileShare: (_file, _success, error) => { if (error) error(new Error('Steam disabled')); },
    saveFilesToCloud: (_files, _success, error) => { if (error) error(new Error('Steam disabled')); },
    _ugcSynchronizeItems: (_opts, _dir, _success, error) => { if (error) error(new Error('Steam disabled')); },
    ugcGetItems: (_opts, _matchType, _queryType, _success, error) => { if (error) error(new Error('Steam disabled')); },
    ugcGetUserItems: (_opts, _matchType, _sortOrder, _list, _success, error) => { if (error) error(new Error('Steam disabled')); },
    publishWorkshopFile: (_opts, _file, _img, _title, _desc, _success, error) => { if (error) error(new Error('Steam disabled')); },
    updatePublishedWorkshopFile: (_opts, _handle, _file, _img, _title, _desc, _success, error) => { if (error) error(new Error('Steam disabled')); },
    init: () => false,
    Utils: {
        move: (src, dst, success, error) => {
            require('fs').rename(src, dst, (err) => {
                if (err) { if (error) error(err); } else { if (success) success(); }
            });
        }
    },
    _steam_events: new EventEmitter(),
    _version: '0.0.0-stub',
});

process.versions['greenworks'] = greenworks._version;

module.exports = greenworks;
