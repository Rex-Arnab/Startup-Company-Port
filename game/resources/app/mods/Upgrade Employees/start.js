let _modPath,
	_scope = GetRootScope(),
	_controller = null

const debug = function () {
	console.log(
		`[${moment().format('HH:mm:ss')}] [Upgrade Employees] `,
		...arguments
	)
}

const _confirmCancel = (message, confirmCallback, cancelCallback) => {

	let cancelButton = null
	let cancelCallbackWrapper = null
	const confirmCallbackWrapper = function () {
		if (confirmCallback)
			confirmCallback()
		if (cancelButton)
			cancelButton.removeEventListener("click", cancelCallbackWrapper, false)
	}
	_scope.confirm(null, message, confirmCallbackWrapper)
	setTimeout(() => {
		cancelButton = document.getElementById("cancel-button")
		if (!cancelButton) {
			debug("Failed to get Confirm Dialog's cancel button. Woops.")
			return;
		}
		cancelCallbackWrapper = function () {
			if (cancelCallback)
				cancelCallback(...arguments)
			cancelButton.removeEventListener("click", cancelCallbackWrapper, false)
		}

		cancelButton.addEventListener("click", cancelCallbackWrapper, false)
	}, 0)
}

const pauseTime = () => {
	if (_scope.settings.paused)
		return () => {}

	Game.Lifecycle.PauseTime(true)
	Helpers.SafeApply()
	return () => {
		Game.Lifecycle.PauseTime(true)
		Helpers.SafeApply()
	}
}

const updateTotalCalc = controller => {
	let employeesThatCanUpgraded = 0
	controller.employeeCost = numeral(0).format(Configuration.CURRENCY_FORMAT)
	controller.employeeBeginner = 0
	controller.employeeIntermediate = 0
	controller.employeeBeginnerToUpgrade = 0
	controller.employeeIntermediateToUpgrade = 0
	controller.employeeNotExpert = 0
	let employeeCost = 0
	for (const employee of Helpers.GetAllEmployees(true)) {
		if (employee.level != Enums.EmployeeLevels.Expert && employee.speed >= employee.maxSpeed) {
			if (employee.employeeTypeName != Enums.EmployeeTypeNames.ChiefExecutiveOfficer) {
				employeeCost += Configuration.EMPLOYEE_UPGRADE_PRICE;
			}
			employeesThatCanUpgraded++
			controller.employeeNotExpert++
			if (employee.level == Enums.EmployeeLevels.Beginner) {
				controller.employeeBeginnerToUpgrade++
				controller.employeeBeginner++
			} else if (employee.level == Enums.EmployeeLevels.Intermediate) {
				controller.employeeIntermediate++
				controller.employeeIntermediateToUpgrade++
			}
		} else if (employee.level != Enums.EmployeeLevels.Expert) {
			if (employee.level == Enums.EmployeeLevels.Beginner) {
				controller.employeeBeginnerToUpgrade++
			} else if (employee.level == Enums.EmployeeLevels.Intermediate) {
				controller.employeeIntermediateToUpgrade++
			}
			controller.employeeNotExpert++
		}
	}
	controller.employeeCost = numeral(employeeCost).format(Configuration.CURRENCY_FORMAT)
	return employeesThatCanUpgraded;
}

const upgradeEmployee = (forceTraining, auto) => {
	num = 0
	for (const employee of Helpers.GetAllEmployees(true)) {
		if (employee.level != Enums.EmployeeLevels.Expert && employee.speed >= employee.maxSpeed) {
			num++
			Helpers.UpgradeEmployeeLevel(employee)
			if (forceTraining) {
				Helpers.ToggleTraining(employee, !0)
			}
		}
	}
	if (num > 0) {
		PlaySound(Sounds.selection)
		_scope.$broadcast(Enums.GameEvents.EmployeeChange)
	}
}

exports.initialize = modPath => {
	_modPath = modPath

	exports.views = [{
		name: 'due',
		viewPath: _modPath + 'UpgradeEmployee.html',
		controller: ["$scope", "$rootScope", "$timeout", function ($scope, $rootScope, $timeout) {
			_controller = this

			this.employeeCost = numeral(0).format(Configuration.CURRENCY_FORMAT)
			this.employeeBeginner = 0
			this.employeeIntermediate = 0
			this.employeeBeginnerToUpgrade = 0
			this.employeeIntermediateToUpgrade = 0
			this.employeeNotExpert = 0
			//this.autoUpgradeAndTraining = false
			//this.autoString = 'auto_repeat'

			this.minimumEmployeeUpgradeOptions = {
				onChange: (id, value) => {
					this.employeesToUpgrade = updateTotalCalc(this)
					this.canEmployeeUpgrade = this.employeesToUpgrade > 0
				},
				onEnd(id, value) {
					this.employeesToUpgrade = updateTotalCalc(this)
					this.canEmployeeUpgrade = this.employeesToUpgrade > 0
					Helpers.SafeApply()
				}
			}
			$timeout(function () {
				$scope.$broadcast("rzSliderForceRender")
			})

			this.employeesToUpgrade = updateTotalCalc(this)
			this.canEmployeeUpgrade = this.employeesToUpgrade > 0

			this.upgradeEmployees = (forceTraining) => {				
				const resumeTime = pauseTime()
				_confirmCancel(Helpers.GetLocalized("upgrade_level_confirm", {
                        price: numeral(Configuration.EMPLOYEE_UPGRADE_PRICE).format(Configuration.CURRENCY_FORMAT)
                    }), () => {
					upgradeEmployee(forceTraining, false)
					resumeTime()
					_scope.closeAllUi()
					_controller = null
				}, () => {
					resumeTime()
					_scope.closeAllUi()
					_controller = null
				})
			}
			//this.autoUpgradeAndTrainingSwitch = () => {				
			//	_controller.autoUpgradeAndTraining = !_controller.autoUpgradeAndTraining
			//	if (this.autoUpgradeAndTraining) {
			//		_controller.autoString = 'stop_training'
			//	} else {
			//		_controller.autoString = 'auto_repeat'
			//	}
			//}
		}],
	}, ]

	Modding.setMenuItem({
		name: 'due',
		tooltip: 'Upgrade Employees',
		tooltipPosition: 'top',
		faIcon: 'fa-user-plus',
	})
}

exports.onNewHour = settings => {
	if (_controller) {
		if (Game.timeMachineActive && settings.date.getHours() !== 7)
			return;
		_controller.employeesToUpgrade = updateTotalCalc(_controller)
		_controller.canEmployeeUpgrade = _controller.employeesToUpgrade > 0
	}
	//if (_controller.autoUpgradeAndTraining) {
	//	upgradeEmployee(true, true)
	//}
}
