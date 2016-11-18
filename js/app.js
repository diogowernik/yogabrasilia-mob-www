angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ng-token-auth'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($authProvider) {
    $authProvider.configure({
        apiUrl: 'http://smartmarket.io/api/v1',
        omniauthWindowType: window.cordova == undefined ? 'newWindow' : 'inAppBrowser',         
        storage: 'localStorage',        
        handleLoginResponse: function(response) {
        console.log(response.data);
        
        return response.data;
        },
        handleAccountUpdateResponse: function(response) {
        console.log(response.data);
        return response.data;
        },
        handleTokenValidationResponse: function(response) {
        console.log(response.data);
        
        return response.data;
        },

confirmationSuccessUrl:  window.location.href,
        storage: 'localStorage'
        /*
        createPopup: function(url) {
            return window.open(url, '_blank', 'closebuttoncaption=Cancel');
        },*/
        

 
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.publications', {
        url: '/publications',
        views: {
            'menuContent': {
                templateUrl: 'templates/publications.html',
                controller: 'PublicationsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        // document.getElementById('fab-publications').classList.toggle('on');
                    }, 200);
                }
            }
        },

        resolve: {
                auth: function($auth, $state) {
                  return $auth.validateUser().catch(function(){                    
                    // redirect unauthorized users to the login page
                    $state.go('app.login');
                  });
                }
              }
    })
    
    .state('app.cards', {
        url: '/cards',
        views: {
            'menuContent': {
                templateUrl: 'templates/cards.html',
                controller: 'CardsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        // document.getElementById('fab-publication').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                // template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.sign-up', {
        url: '/sign-up',
        views: {
            'menuContent': {
                templateUrl: 'templates/sign-up.html',
                controller: 'SignUpCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    
    .state('app.my-cards', {
        url: '/my-cards',
        views: {
            'menuContent': {
                templateUrl: 'templates/my-cards.html',
                controller: 'MyCardsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    
    .state('app.conversation', {
        url: '/conversation',
        views: {
            'menuContent': {
                templateUrl: 'templates/conversation.html',
                controller: 'ConversationCtrl'
            },
            'fabContent': {
                // template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.config', {
        url: '/config',
        views: {
            'menuContent': {
                templateUrl: 'templates/config.html',
                controller: 'ConfigCtrl'
            },
            'fabContent': {
                // template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-config').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/publications');
});

