var app = angular.module('cmdpp', ['vtortola.ng-terminal', 'angularLoad']);

// Controllers

app.controller('cmdppController', ['$scope', '$http', '$rootScope', 'angularLoad', function($scope, $http, $rootScope, angularLoad) {
    $rootScope.theme = 'vintage';
    $scope.formattedBytes = '0 B';
    $scope.money = '$0.00';
    $scope.storage = '$0.00';
    $scope.scheme = 'default';
    console.log('Angular Load:', angularLoad);

    var numDots = Math.floor(Math.random() * 10) + 1;
    var startText = ['Searching for save file'];
    for (var i = 0; i < numDots; i++) {
        startText.push('.');
    }

    $scope.$broadcast('terminal-output', {
        output: true,
        text: startText,
        breakLine: false
    });

    var cmd;

    $http.get('https://api.github.com/repos/cmdPP/core/releases').then(function(res) {
        var assets = res.data[0].assets;
        var bundleURL = "";
        for (var asset of assets) {
            if (asset.name === "bundle.js") {
                bundleURL = asset.browser_download_url;
            }
        }
        return angularLoad.loadScript(bundleURL);
    }).then(function() {
        var cmd = new CMD(
            function() {
                console.log(arguments);
                $scope.$broadcast('terminal-output', {
                    output: true,
                    text: arguments,
                    breakLine: true
                });
            },
            function(cmdData) {
                if (typeof Storage !== "undefined") {
                    for (var i in cmdData) {
                        localStorage.setItem(i, JSON.stringify(cmdData[i]));
                    }
                }
            },
            function() {
                var storedDataNames = ['data', 'money', 'increment', 'autoIncrement', 'storage', 'unlocked'];
                var loadObj = {};
                for (var i = 0; i < storedDataNames.length; i++) {
                    var dataName = storedDataNames[i];
                    loadObj[dataName] = JSON.parse(localStorage.getItem(dataName));
                }
                return loadObj;
            },
            function(cmdObj) {
                $scope.formattedBytes = cmdObj.formatBytes();
                $scope.money = cmdObj.money;
                // $scope.storage = cmdObj.formatter(cmdObj.storages[cmdObj.storage].capacity);
                $scope.storage = cmdObj.formatter(cmdObj.storage.capacity);
                // $scope.scheme = cmdObj.scheme;
                $scope.$apply();
            },
            function() {
                var self = this;
                return {
                    colorScheme: {
                        func: function(scheme) {
                            var schemes = ['default', 'coral', 'fire', 'hacker', 'invert', 'mint', 'naked', 'ocean'];
                            if (scheme && scheme !== "") {
                                if (scheme === $scope.scheme) {
                                    self.respond("You've already selected this scheme.");
                                } else if (schemes.indexOf(scheme) !== -1) {
                                    $scope.scheme = scheme;
                                    self.respond("You've changed your scheme to: "+scheme);
                                } else {
                                    self.respond("Scheme not found.");
                                }
                            } else {
                                self.command("help colorScheme");
                            }
                            // self.update();
                        },
                        desc: function() {
                            var schemes = ['default', 'coral', 'fire', 'hacker', 'invert', 'mint', 'naked', 'ocean'];
                            var available = ["Sets the color scheme.", "Available color schemes:"];
                            for (var scheme of schemes) {
                                if (scheme === self.scheme) {
                                    scheme = "* "+scheme;
                                }
                                available.push("\t"+scheme);
                            }
                            return available;
                        }
                    }
                };
            }
        );
        // cmd.scheme = "default";

        $scope.version = 'v'+cmd.version;

        $scope.$on('terminal-input', function(e, consoleInput) {
            cmd.command(consoleInput[0].command);
        });

        setTimeout(function() {
            $scope.$broadcast('terminal-output', {
                output: true,
                text: [
                    'Welcome to CMD++',
                    'This is a demo.',
                    'Have fun!\n\n',
                    'Please type "help" to open a list of commands.'
                ]
            });
            $scope.$apply();
        }, 100);
    });

    // var cmd = new CMD({
    //     debug: true,
    //     funcs: {
    //         respond: function() {
    //             console.log(arguments);
    //             $scope.$broadcast('terminal-output', {
    //                 output: true,
    //                 text: arguments,
    //                 breakLine: true
    //             });
    //         },
    //         save: function(cmdData) {
    //             if (typeof Storage !== "undefined") {
    //                 for (var i in cmdData) {
    //                     localStorage.setItem(i, JSON.stringify(cmdData[i]));
    //                 }
    //             }
    //         },
    //         load: function() {
    //             var storedDataNames = ['data', 'money', 'increment', 'autoIncrement', 'unlocked'];
    //             var loadObj = {};
    //             for (var i = 0; i < storedDataNames.length; i++) {
    //                 var dataName = storedDataNames[i];
    //                 loadObj[dataName] = JSON.parse(localStorage.getItem(dataName));
    //             }
    //             return loadObj;
    //         },
    //         update: function(cmdObj) {
    //             $scope.formattedBytes = cmdObj.formatBytes();
    //             $scope.money = cmdObj.money;
    //             $scope.storage = cmdObj.formatter(cmdObj.storages[cmdObj.storage].capacity);
    //             $scope.$apply();
    //         }
    //     }
    // });

    // $scope.version = 'v'+cmd.version;
    //
    // $scope.$on('terminal-input', function(e, consoleInput) {
    //     cmd.command(consoleInput[0].command);
    // });
    //
    // setTimeout(function() {
    //     $scope.$broadcast('terminal-output', {
    //         output: true,
    //         text: [
    //             'Welcome to CMD++',
    //             'This is a demo.',
    //             'Have fun!\n\n',
    //             'Please type "help" to open a list of commands.'
    //         ]
    //     });
    //     $scope.$apply();
    // }, 100);

    console.log($rootScope);
}]);

// Directives

app.directive('stats', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            data: '=',
            money: '=',
            storage: '=',
            version: '=',
            scheme: '='
        },
        templateUrl: 'views/stats.html'
    };
});

// Providers

// Config

app.config(['terminalConfigurationProvider', function(terminalConfigurationProvider) {
    console.log('In config!');
    console.log(terminalConfigurationProvider);
    console.log('vintage?');
    console.log(terminalConfigurationProvider.config('vintage'));
    terminalConfigurationProvider.config('vintage').outputDelay = 10;
    terminalConfigurationProvider.config('vintage').allowTypeingWriteDisplaying = false;
    terminalConfigurationProvider.config('vintage').typeSoundUrl = 'wav/lib/type.wav';
    terminalConfigurationProvider.config('vintage').startSoundUrl = 'wav/lib/start.wav';
    console.log(terminalConfigurationProvider);
}]);
