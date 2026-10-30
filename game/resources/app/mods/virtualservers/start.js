let _self = this;
let _modPath;
const rs = GetRootScope();
this.loadLanguage = function (lang) {
    $.getJSON(_modPath + '/locales/' + lang + '.json',
            function (jsonData) {
                $.each(jsonData, function (name, value) {
                    GetRootScope().Language[name] = value;
                });

                GetRootScope().settings.serverspack.language = lang;
            }
    )
    .fail(function () {
        _self.loadLanguage('en');
        rs.settings.serverspack.language = 'en';
    });

    return;
};
    

exports.initialize = (modPath) => {
    _modPath = modPath;
    ServerNames.virtualpack_virtual_11 = 'virtualpack_virtual_11';
    ServerNames.virtualpack_virtual_12 = 'virtualpack_virtual_12';
    ServerNames.virtualpack_virtual_13 = 'virtualpack_virtual_13';
    ServerNames.virtualpack_virtual_14 = 'virtualpack_virtual_14';
    ServerNames.virtualpack_virtual_15 = 'virtualpack_virtual_15';
    ServerNames.virtualpack_virtual_16 = 'virtualpack_virtual_16';
    ServerNames.virtualpack_virtual_17 = 'virtualpack_virtual_17';
    ServerNames.virtualpack_virtual_18 = 'virtualpack_virtual_18';
    ServerNames.virtualpack_virtual_19 = 'virtualpack_virtual_19';
    ServerNames.virtualpack_virtual_20 = 'virtualpack_virtual_20';
    ServerNames.virtualpack_virtual_21 = 'virtualpack_virtual_21';
    ServerNames.virtualpack_virtual_22 = 'virtualpack_virtual_22';

    Configuration.MAXIMUM_CU_FROM_VIRTUAL_SERVERS = 2000e8;
    Configuration.MAX_CU_FROM_VIRTUAL_SERVERS = 2000e8;

    Servers.push({
        name: ServerNames.virtualpack_virtual_11,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 50,
            VirtualHardware: 40,
            OperatingSystem: 50,
            Firewall: 30,
        },
        computeUnit: 15e3,
        pricePerDay: 900
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_12,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 50,
            VirtualHardware: 50,
            OperatingSystem: 50,
            Firewall: 60,
        },
        computeUnit: 16e3,
        pricePerDay: 1000
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_13,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 60,
            VirtualHardware: 60,
            OperatingSystem: 60,
            Firewall: 50,
        },
        computeUnit: 17e3,
        pricePerDay: 1100
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_14,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 70,
            VirtualHardware: 70,
            OperatingSystem: 70,
            Firewall: 60,
        },
        computeUnit: 15e3,
        pricePerDay: 1200
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_15,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 80,
            VirtualHardware: 80,
            OperatingSystem: 80,
            Firewall: 7,
        },
        computeUnit: 15e3,
        pricePerDay: 1300
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_16,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 90,
            VirtualHardware: 90,
            OperatingSystem: 90,
            Firewall: 80,
        },
        computeUnit: 16e3,
        pricePerDay: 1400
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_17,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 100,
            VirtualHardware: 100,
            OperatingSystem: 100,
            Firewall: 90,
        },
        computeUnit: 17e3,
        pricePerDay: 1500
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_18,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 110,
            VirtualHardware: 110,
            OperatingSystem: 110,
            Firewall: 100,
        },
        computeUnit: 18e3,
        pricePerDay: 1600
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_19,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 120,
            VirtualHardware: 120,
            OperatingSystem: 120,
            Firewall: 130,
        },
        computeUnit: 19e3,
        pricePerDay: 1700
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_20,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 130,
            VirtualHardware: 130,
            OperatingSystem: 130,
            Firewall: 120,
        },
        computeUnit: 20e3,
        pricePerDay: 1800
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_21,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 140,
            VirtualHardware: 140,
            OperatingSystem: 140,
            Firewall: 130,
        },
        computeUnit: 21e3,
        pricePerDay: 1900
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_22,
        employeeLevel: Enums.EmployeeLevels.Expert,
        requirements: {
            NetworkComponent: 5000,
            VirtualHardware: 5000,
            OperatingSystem: 5000,
            Firewall: 5550,
            ProcessManagement: 5000,
            ContinuousIntegration: 5000,
            VirtualContainer: 5000,
            Cluster: 5500,
            SwarmManagement: 5500
        },
        computeUnit: 55e3,
        pricePerDay: 0
    })

    exports.onBackgroundWorkerStart = () => {
        ServerNames.virtualpack_virtual_11 = 'virtualpack_virtual_11';
    ServerNames.virtualpack_virtual_12 = 'virtualpack_virtual_12';
    ServerNames.virtualpack_virtual_13 = 'virtualpack_virtual_13';
    ServerNames.virtualpack_virtual_14 = 'virtualpack_virtual_14';
    ServerNames.virtualpack_virtual_15 = 'virtualpack_virtual_15';
    ServerNames.virtualpack_virtual_16 = 'virtualpack_virtual_16';
    ServerNames.virtualpack_virtual_17 = 'virtualpack_virtual_17';
    ServerNames.virtualpack_virtual_18 = 'virtualpack_virtual_18';
    ServerNames.virtualpack_virtual_19 = 'virtualpack_virtual_19';
    ServerNames.virtualpack_virtual_20 = 'virtualpack_virtual_20';
    ServerNames.virtualpack_virtual_21 = 'virtualpack_virtual_21';
    ServerNames.virtualpack_virtual_22 = 'virtualpack_virtual_22';

    Configuration.MAXIMUM_CU_FROM_VIRTUAL_SERVERS = 2000e8;
    Configuration.MAX_CU_FROM_VIRTUAL_SERVERS = 2000e8;

    Servers.push({
        name: ServerNames.virtualpack_virtual_11,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 50,
            VirtualHardware: 40,
            OperatingSystem: 50,
            Firewall: 30,
        },
        computeUnit: 15e3,
        pricePerDay: 900
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_12,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 50,
            VirtualHardware: 50,
            OperatingSystem: 50,
            Firewall: 60,
        },
        computeUnit: 16e3,
        pricePerDay: 1000
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_13,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 60,
            VirtualHardware: 60,
            OperatingSystem: 60,
            Firewall: 50,
        },
        computeUnit: 17e3,
        pricePerDay: 1100
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_14,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 70,
            VirtualHardware: 70,
            OperatingSystem: 70,
            Firewall: 60,
        },
        computeUnit: 15e3,
        pricePerDay: 1200
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_15,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 80,
            VirtualHardware: 80,
            OperatingSystem: 80,
            Firewall: 7,
        },
        computeUnit: 15e3,
        pricePerDay: 1300
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_16,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 90,
            VirtualHardware: 90,
            OperatingSystem: 90,
            Firewall: 80,
        },
        computeUnit: 16e3,
        pricePerDay: 1400
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_17,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 100,
            VirtualHardware: 100,
            OperatingSystem: 100,
            Firewall: 90,
        },
        computeUnit: 17e3,
        pricePerDay: 1500
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_18,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 110,
            VirtualHardware: 110,
            OperatingSystem: 110,
            Firewall: 100,
        },
        computeUnit: 18e3,
        pricePerDay: 1600
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_19,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 120,
            VirtualHardware: 120,
            OperatingSystem: 120,
            Firewall: 130,
        },
        computeUnit: 19e3,
        pricePerDay: 1700
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_20,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 130,
            VirtualHardware: 130,
            OperatingSystem: 130,
            Firewall: 120,
        },
        computeUnit: 20e3,
        pricePerDay: 1800
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_21,
        employeeLevel: Enums.EmployeeLevels.Beginner,
        requirements: {
            NetworkComponent: 140,
            VirtualHardware: 140,
            OperatingSystem: 140,
            Firewall: 130,
        },
        computeUnit: 21e3,
        pricePerDay: 1900
    })
    Servers.push({
        name: ServerNames.virtualpack_virtual_22,
        employeeLevel: Enums.EmployeeLevels.Expert,
        requirements: {
            NetworkComponent: 5000,
            VirtualHardware: 5000,
            OperatingSystem: 5000,
            Firewall: 5550,
            ProcessManagement: 5000,
            ContinuousIntegration: 5000,
            VirtualContainer: 5000,
            Cluster: 5500,
            SwarmManagement: 5500
        },
        computeUnit: 55e3,
        pricePerDay: 0
    })
}


exports.onLoadGame = settings => {if 
    (settings.serverspack !== undefined) {
    _self.loadLanguage(settings.serverspack.language);
} else {

    settings.serverspack = {language: rs.options.language};
    _self.loadLanguage(rs.options.language);
}
}
}