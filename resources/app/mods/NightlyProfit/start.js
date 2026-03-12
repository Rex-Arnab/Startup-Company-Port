// game settings
let ModPath;
let Scope = GetRootScope();

// bool values
let DataLoaded = false;

// int values
let BadgeCount;
let NewBal = 0;
let OldBal = 0;
let Profit = 0;
let DaysPlayed = 0;
let TotalProfit = 0;
let MaxShownProfits = 365;

// arrays
var ProfitList = [];
let DayList = [];
let ProfitListFull = [];
let DayListFull = [];
var ProfitColor = [];
var ProfitColorBorder = [];
var Labels = [];

// color values
let ProfitColorTotal;

var DataShowcase = 'bar';
var TimeFrame = 7;
let ChartConfig;

var SaveName;

var MyBarChart;
var MyLineChart;

var SmallestProfit = 0;
var LargestProfit = 0;

var EnableNotifications = true;
var EnableBadges = true;
var ZeroGraphs = true;

// upon opening the view
exports.initialize = modPath => {

	// get the mod path
	ModPath = modPath;

	// handle the view
	exports.views = [{
		name: 'nightlyprofitmod',
		viewPath: ModPath + "NightlyProfitWindow.html",
		controller: function ($rootScope) {
			this.selectedChartType = DataShowcase;
			this.timeFrame = TimeFrame.toString();
			this.enableNotifications = EnableNotifications;
			this.enableBadges = EnableBadges;
			this.zeroGraphs = ZeroGraphs;

			var NotificationsChecked = document.getElementById("EnableNotifications");
			var BadgesChecked = document.getElementById("EnableBadges");
			var ZeroGraphsChecked = document.getElementById("ZeroGraphs");

			NotificationsChecked.checked = EnableNotifications;
			BadgesChecked.checked = EnableBadges;
			ZeroGraphsChecked.checked = ZeroGraphs;

			UpdateMainPage();

			DataDisplayed();

			this.ChangeDataShowcase = (amount) => {
				var ds = document.getElementById("dataDisplay").value;
				DataShowcase = ds == "" ? DataShowcase : ds;

				DataDisplayed();
			}

			this.ChangeTimeFrame = (amount) => {
				var tf = document.getElementById("timeFrameSelect").value;
				TimeFrame = tf == "" ? TimeFrame : tf;

				UpdateMainPage();
				this.ChangeDataShowcase();
			}

			this.UpdateSettings = (amount) => {
				EnableNotifications = NotificationsChecked.checked;
				EnableBadges = BadgesChecked.checked;
				ZeroGraphs = ZeroGraphsChecked.checked;

				UpdateMainPage();

				SaveSettings();
			}
		}
	}]

	// add the item to the menu
	Modding.setMenuItem ({
		name: 'nightlyprofitmod',
		tooltip: 'Nightly Profit',
		tooltipPosition: 'right',
		faIcon: 'fa-dollar',
		badgeCount: 0
	});
}

// upon loading the game
exports.onLoadGame = settings => {
	if (DataLoaded == false || SaveName != Scope.settings.fileName) {
		var originalOnNewDay = Game.Lifecycle._onNewDay;
		Game.Lifecycle._onNewDay = () => {
			OldBal = Scope.settings.balance;

			originalOnNewDay();
		};

		TotalProfit = 0;

		LoadSettings();

		SortLists();
		DataLoaded = true;

		SaveName = Scope.settings.fileName;
	}
}

// on a new hour
exports.onNewDay = settings => {
	setTimeout(NewDay, 50);
}

function DataDisplayed() {
	if (DataShowcase == "bar") {
		document.getElementById('npmBarChart').style.display = "inline";
		document.getElementById('npmLineChart').style.display = "none";
	} else if (DataShowcase == "line") {
		document.getElementById('npmBarChart').style.display = "none";
		document.getElementById('npmLineChart').style.display = "inline";
	}
}

function NewDay() {
	var CurrentDate = Scope.settings.date;

	if (EnableBadges) {
		BadgeCount++;
		Modding.setMenuItemBadgeCount('nightlyprofitmod', BadgeCount);
	}

	NewBal = Scope.settings.balance;

	TotalProfit = 0;
	DaysPlayed = Scope.daysPlayed - 1;
	Profit = Math.round(NewBal - OldBal);

	if (ProfitList.length >= MaxShownProfits) {
		for(var i = 0; i < MaxShownProfits - 1; i++) {
			ProfitList[i] = ProfitList[i + 1];
			DayList[i] = DayList[i + 1];
		}
		ProfitList[MaxShownProfits - 1] = Profit;
		DayList[MaxShownProfits - 1] = DaysPlayed;
	} else {
		ProfitList.push(Profit);
		DayList.push(DaysPlayed);
	}

	OldBal = NewBal;

	if (EnableNotifications) {
		if (Scope.BetaVersion >= "26.0") {
			Helpers.ShowNotification("Day " + DaysPlayed.toString() + ". You made $" + Profit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " last night.", "#000000", 24, false);
		} else {
			Scope.addNotification("Day " + DaysPlayed.toString() + ". You made $" + Profit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " last night.", 24);
		}
	}


	SortLists();

	SaveSettings();

	if (document.getElementById("npmBarChart") != null) {
		UpdateMainPage();
	}
}

// load the settings
function LoadSettings() {
	// game settings
	DaysPlayed = Scope.daysPlayed;

	// mod settings
	var npm = Scope.settings.nightlyProfitMod;
	if (npm == null) {
		ResetSaveData();
	} else {
		ProfitList = npm.profit == null ? [] : npm.profit;
		DayList = npm.days == null ? [] : npm.days;
		BadgeCount = npm.badgecount == null ? 0 : npm.badgecount;
		OldBal = npm.oldBal == null ? Scope.settings.balance : npm.oldBal;
		TimeFrame = npm.timeFrame == null ? 7 : npm.timeFrame;
		EnableNotifications = npm.enableNotifications == null ? true : npm.enableNotifications;
		EnableBadges = npm.enableBadges == null ? true : npm.enableBadges;
		ZeroGraphs = npm.zeroGraphs == null ? true : npm.zeroGraphs;

		if (ProfitList.length != DayList.length) {
			ProfitList = [];
			DayList = [];
		}

		if (!EnableBadges) {
			BadgeCount = 0;
		}

		Modding.setMenuItemBadgeCount('nightlyprofitmod', BadgeCount);
	}

	if (ProfitList.length > 0) {
		if (typeof ProfitList[0] != "number") {
			ProfitList = ConvertToInteger(ProfitList);
		}
	}

	SaveSettings();
}

// convert strings to integers
function ConvertToInteger(Array) {
	for (var i = 0; i < Array.length; i++) {
		Array[i] = parseInt(Array[i].replace(/,\s?/g, ""));
	}

	return Array;
}

// reset the save data
function ResetSaveData() {
	console.log("NPM: Errors In Loading");
	ProfitList = [];
	DayList = [];
	BadgeCount = 0;
	OldBal = Scope.settings.balance;
	TimeFrame = 7;
}

// save the settings
function SaveSettings() {
	Scope.settings.nightlyProfitMod = {
		profit: ProfitList,
		days: DayList,
		badgecount: BadgeCount,
		oldBal: OldBal,
		timeFrame: TimeFrame,
		enableNotifications: EnableNotifications,
		enableBadges: EnableBadges,
		zeroGraphs: ZeroGraphs
	}
}

// sort the lists
function SortLists() {
	if (ProfitList[-1] != null) {
		console.log("OLD_SAVE");
	} else {
		console.log("NEW_SAVE");
	}

	if (DayList.length > MaxShownProfits) {
		var x = MaxShownProfits;
	} else {
		var x = DayList.length;
	}

	for (var i = x - 1; i >= 0; i--) {
		if (ProfitList[i] == null) {
			ProfitListFull[i] = "0";
			ProfitColor[0] = "#008000";
		} else {
			ProfitListFull[i] = ProfitList[i];
			var TempProfit = ProfitList[i];
			TotalProfit += TempProfit;

			if (TempProfit >= 0) {
				ProfitColor[i] = "#008000";
			} else {
				ProfitColor[i] = "#FF0000";
			}
		}
		if (DayList[i] == null) {
			DayListFull[i] = "Day " + (i - (DayList.length) + Scope.daysPlayed).toString();
		} else {
			DayListFull[i] = "Day " + DayList[i].toString();
		}
	}
}

function CreateCharts() {
	var ctx;

	var newProfitList = [];
	var newDayList = [];
	var newProfitColor = [];
	var newProfitColorBorder = [];
	var newProfitTotal = 0;
	var borderColor = 0;
	var iStart = 0;

	if (ProfitList.length - TimeFrame >= 0) {
		iStart = ProfitList.length - TimeFrame;
	}

	LargestProfit = 0;
	SmallestProfit = 1.7976931348623157E+10308;

	for(var i = iStart; i < ProfitList.length; i++) {
		var TempProfit = ProfitList[i];
		newProfitTotal += TempProfit;

		newProfitList[i - iStart] = ProfitList[i];
		newDayList[i - iStart] = DayListFull[i];

		if (TempProfit > LargestProfit) {
			LargestProfit = TempProfit;
		}

		if (TempProfit < SmallestProfit) {
			SmallestProfit = TempProfit;
		}

		if (newProfitList[i - iStart] >= 0) {
			newProfitColor[i - iStart] = 'rgba(0, 128, 0, 0.2)';
			newProfitColorBorder[i - iStart] = 'rgba(0, 128, 0, 1)';
		} else {
			newProfitColor[i - iStart] = 'rgba(255, 0, 0, 0.2)';
			newProfitColorBorder[i - iStart] = 'rgba(255, 0, 0, 1)';
		}
	}

	if (TotalProfit >= 0) {
		Color = 'rgba(0, 128, 0, 1)';
		borderColor = 'rgba(0, 128, 0, 0.2)';
	} else {
		Color = 'rgba(255, 0, 0, 1)';
		borderColor = 'rgba(255, 0, 0, 0.2)';
	}

	document.getElementById("TotalProfitAmount").innerHTML = "$" + newProfitTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
	document.getElementById("TotalProfitAmount").style.color = Color;

	if (SmallestProfit >= 0) {
		Color = 'rgba(0, 128, 0, 1)';
	} else {
		Color = 'rgba(255, 0, 0, 1)';
	}

	document.getElementById("SmallestProfitAmount").innerHTML = "$" + SmallestProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("SmallestProfitAmount").style.color = Color;

	if (LargestProfit >= 0) {
		Color = 'rgba(0, 128, 0, 1)';
	} else {
		Color = 'rgba(255, 0, 0, 1)';
	}

	document.getElementById("LargestProfitAmount").innerHTML = "$" + LargestProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	document.getElementById("LargestProfitAmount").style.color = Color;

	ctx = document.getElementById('npmBarChart').getContext('2d');
	ChartConfig = {
		type: 'bar',
		data: {
			labels: newDayList,
			datasets: [{
				label: 'Nightly Profit',
				data: newProfitList,
				backgroundColor: newProfitColor,
				borderColor: newProfitColorBorder,
				borderWidth: 1
			}]
		},
		options: {
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var value = data.datasets[0].data[tooltipItem.index];
							if (parseInt(value) >= 1000 || parseInt(value) <= -1000) {
							return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						} else {
							return '$' + value;
						}
					}
				} // end callbacks:
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: ZeroGraphs,
						callback: function(value, index, values) {
							if (parseInt(value) >= 1000 || parseInt(value) <= -1000) {
                               return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                               return '$' + value;
                            }
                       }
					}
				}],
				xAxes: [{
					ticks: {
						beginAtZero: ZeroGraphs,
        				maxTicksLimit: 20
					}
				}]
			}
		}
	};

	if (MyBarChart == null) {
		MyBarChart = new Chart(ctx, ChartConfig);
	} else {
		MyBarChart.destroy();
		MyBarChart = new Chart(ctx, ChartConfig);
	}



	ctx = document.getElementById('npmLineChart').getContext('2d');
	ChartConfig = {
		type: 'line',
		data: {
			labels: newDayList,
			datasets: [{
				label: 'Nightly Profit',
				data: newProfitList,
				backgroundColor: borderColor,
				borderColor: Color,
				borderWidth: 1
			}]
		},
		options: {
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var value = data.datasets[0].data[tooltipItem.index];
						if (parseInt(value) >= 1000 || parseInt(value) <= -1000) {
							return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						} else {
							return '$' + value;
						}
					}
				} // end callbacks:
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: ZeroGraphs,
						callback: function(value, index, values) {
							if (parseInt(value) >= 1000 || parseInt(value) <= -1000) {
                               return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                               return '$' + value;
                            }
                       }
					}
				}],
				xAxes: [{
					ticks: {
						beginAtZero: ZeroGraphs,
        				maxTicksLimit: 20
					}
				}]
			}
		}
	};

	if (MyLineChart == null) {
		MyLineChart = new Chart(ctx, ChartConfig);
	} else {
		MyLineChart.destroy();
		MyLineChart = new Chart(ctx, ChartConfig);
	}

	DataDisplayed();
}

function UpdateMainPage() {
	// if there is data in the array
	if (DayListFull.length != 0) {
		if (DayListFull.length == 1) {
			document.getElementById("totalProfit").innerHTML = 'Total Profits (In The Last Day):';
		} else {
			var dayCount = TimeFrame;
			if (DayList.length < TimeFrame) {
				dayCount = DayList.length;
			}
			var lengthType = " Days):";
			if (dayCount == 7) {
				lengthType = " Week):";
				dayCount = 1;
			} else if (dayCount == 14) {
				lengthType = " Weeks):";
				dayCount = 2;
			} else if (dayCount == 30) {
				lengthType = " Month):";
				dayCount = 1;
			} else if (dayCount == 60) {
				lengthType = " Months):";
				dayCount = 2;
			} else if (dayCount == 365) {
				lengthType = " Year):";
				dayCount = 1;
			}

			document.getElementById("totalProfit").innerHTML = 'Total Profits (' + dayCount.toString() + lengthType;
			document.getElementById("SmallestProfitString").innerHTML = 'Smallest Profit (' + dayCount.toString() + lengthType;
			document.getElementById("LargestProfitString").innerHTML = 'Largest Profit (' + dayCount.toString() + lengthType;
		}

		if (ProfitList[ProfitList.length - 1] >= 0) {
			Color = 'rgba(0, 128, 0, 1)';
		} else {
			Color = 'rgba(255, 0, 0, 1)';
		}

		document.getElementById("LastNightProfitAmount").innerHTML = "$" + ProfitList[ProfitList.length - 1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("LastNightProfitAmount").style.color = Color;

		if (DataShowcase == "bar") {
			document.getElementById('npmBarChart').style.display = "inline";
			document.getElementById('npmLineChart').style.display = "none";
		} else if (DataShowcase == "line") {
			document.getElementById('npmBarChart').style.display = "none";
			document.getElementById('npmLineChart').style.display = "inline";
		}
	} else {
		document.getElementById("totalProfit").innerHTML = 'Looks like there\'s no profits to display yet! Come back tomorrow.';
	}

	CreateCharts();

	// handle the badge count
	Modding.setMenuItemBadgeCount('nightlyprofitmod', 0);
	BadgeCount = 0;
}
