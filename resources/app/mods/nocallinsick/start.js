let _modPath;

exports.initialize = (modPath) =>{                     
    _modPath = modPath;
};

exports.onLoadGame  = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.callInSickDaysLeft = 48
		}
	});
};

exports.onNewDay = settings => {
	settings.office.workstations.forEach(ws => {
		if (ws.employee != null) {
			ws.employee.callInSickDaysLeft = 48
		}
	});
};