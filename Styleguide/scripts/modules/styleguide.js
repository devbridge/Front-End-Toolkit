(function () {
'use strict';

	function config ($stateProvider, $urlRouterProvider, getSnippetsProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/default.html',
				data: {
					pageTitle: 'Home'
				}
			})
			.state('general', {
				url: '/general',
				templateUrl: 'views/general.html',
				data: {
					pageTitle: 'General'
				}
			});
	}

	function getSnippets ($stateProvider) {
		var self = this,
			snippetPages = [];

		self.$get = function ($http, $state, $filter) {
			return {
				setUpRoutes: function () {
					$http.get('scripts/snippets.json').
						success(function (data) {

							angular.forEach(data, function (value) {
								var filename = value.filename.slice(0, -5),
									title = filename.replace('-', ' ');

								title = $filter('capitalize')(title);

								if (filename !== undefined) {
									this.push({
										name: ''+ filename +'',
										url: '/'+ filename +'',
										templateUrl: 'snippets/'+ filename +
										'.html',
										data: {
											pageTitle: ''+ title +''
										}
									});
								}

							}, snippetPages);

							angular.forEach(snippetPages, function (item) {
								if (!$state.get(item.name)) {
									$stateProvider
										.state(item.name, {
											url: item.url,
											templateUrl: item.templateUrl,
											data: {
												pageTitle: item.data.pageTitle
											}
										});
								}
							});
						}).
						error(function() {
							console.log('Error when trying to read ' +
							'snippets.json');
						});
				}
			};
		};
	}

	function sgController ($scope) {

	}

	function capitalize () {
		return function (text) {
			return text ? text.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1)
						.toLowerCase();
			}) : '';
		};
	}

	function navigation ($state) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/navigationDirective.html',
			controller: function ($scope) {
				$scope.menuItems = $state.get();
				$scope.menuItems.splice(0, 1);
			}
		};
	}
	
	function fonts () {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			controller: function ($scope, $element, $attrs, $compile) {
				$scope.fonts = [];
				var fontVars = $element.text().split(/\s*\n/),
					template = angular.element(
						'<div class="sg-font-wrapper" ' +
						'ng-repeat="font in fonts">' +
							'{{font.name}}' +
							'<div class="sg-font-example" ' +
						'contenteditable="true" style="{{font.style}}">' +
								'a b c d e f g h i j k l m n o p q r s t u ' +
						'v w x y z<br/>' +
								'A B C D E F G H I J K L M N O P Q R S T U ' +
						'V W X Y Z</br>' +
								'1 2 3 4 5 6 7 8 9 0' +
							'</div>' +
						'</div>'
					);

				fontVars.forEach(function (font) {
					var fontStyles = font.split(';'),
						fontValue = fontStyles[0].split(/:/)[1];
					if (fontStyles.length > 0) {
						fontStyles.shift();
						fontStyles = fontStyles.join(';');
					} else {
						fontStyles = '';
					}
					if (fontValue !== undefined && fontValue.length > 0) {
						fontStyles = fontStyles +
						'font-family:' + fontValue.trim() + ';';
					}
					if (font && font.match(/:{1}/)) {
						$scope.fonts.push({
							name: font.trim(),
							style: fontStyles
						});
					}
				});
				$compile(template)($scope);
				$element.html('');
				$element.append(template);
			}
		};
	}

	function palette () {
		return {
			restrict: 'E',
			scope: true,
			replace: true,
			compile: function (tElement, tAttributes) {
				var colors = [],
					variables = [],
					colorItems = tElement.find('colors').text().split(/\s*\n/),
					colorVars = tElement.find('vars').text().split(/\s*\n/);

				colorItems.forEach(function (color) {
					var colorItem = color.split(';'),
						colorName = colorItem[0].split(':')[0],
						colorCode = colorItem[0].split(':')[1];
					if (colorName !== undefined && colorCode !== undefined) {
						colors.push({
							name: colorName.trim(),
							code: colorCode.trim(),
							variables: []
						});
					}
				});

				colorVars.forEach(function (color) {
					var colorVarItem = color.split(';'),
						colorVarName = colorVarItem[0].split(':')[0],
						colorVarColor = colorVarItem[0].split(':')[1];
					if (colorVarName !== undefined && colorVarColor !==
						undefined) {
						variables.push({
							variable: colorVarName.trim(),
							color: colorVarColor.trim()
						});
					}
				});

				colors.forEach(function (color) {
					variables.forEach(function (variable) {
						if (color.name === variable.color) {
							color.variables.push(variable.variable);
						}
					});
				});

				var template =
					angular.element(
						'<div class="sg-color-block" ' +
						'ng-class="{\'sg-color-block-small\': ' +
						'color.variables.length == 0}"' +
						'ng-repeat="color in colors">' +
							'<div class="sg-color-palette" ' +
							'ng-class="colorContrast(color.code)"' +
							'style="background-color: {{color.code}}">' +
								'<div class="sg-color-palette-inner">' +
									'{{color.code}}<br>' +
									'{{color.name}}<br>' +
								'</div>' +
							'</div>' +
							'<ul class="sg-color-variables" ' +
							'ng-if="color.variables.length > 0">' +
								'<li contenteditable="true" ' +
								'ng-repeat="variable in color.variables">' +
									'{{variable}}' +
								'</li>' +
							'</ul>' +
						'</div>');

				tElement.html('');
				tElement.append(template);

				return function (scope, element, attr) {
					scope.colors = colors;
					scope.variables = variables;

					scope.colorContrast = function (colorCode) {
						var hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,
							hexShortRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
							hexToRgbRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
							rgbRegex = /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
							color = colorCode,
							rgb = null,
							rgbSum,
							temp;

						// Check if hex color
						if (hexRegex.test(color)) {

							// Convert hex to full format (i.e. #fff => #ffffff)
							color = color.replace(hexShortRegex,
								function(m, r, g, b) {
									return r + r + g + g + b + b;
								});
							temp = hexToRgbRegex.exec(color);

							rgb = temp ? {
								r: parseInt(temp[1], 16),
								g: parseInt(temp[2], 16),
								b: parseInt(temp[3], 16)
							} : null;

							if (rgb !== null) {
								rgbSum = parseInt(rgb.r) + parseInt(rgb.g) +
								parseInt(rgb.b);

								if (rgbSum < 720) {
									return 'dark';
								}
								if (rgbSum > 600) {
									return 'light';
								}
							}
						}

						if (rgbRegex.test(color)) {
							temp = rgbRegex.exec(color);

							rgb = temp ? {
								r: parseInt(temp[1], 16),
								g: parseInt(temp[2], 16),
								b: parseInt(temp[3], 16)
							} : null;

							if (rgb !== null) {
								rgbSum = parseInt(rgb.r) + parseInt(rgb.g) +
								parseInt(rgb.b);

								if (rgbSum < 720) {
									return 'dark';
								}
								if (rgbSum > 600) {
									return 'light';
								}
							}
						}
					};
				};
			}
		};
	}
	
	function snippet () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				snippetTitle: '@',
				snippetDescription: '@'
			},
			templateUrl: 'views/directives/snippetDirective.html',
			controller: function ($scope, $element, $transclude, $compile) {
				$transclude($scope, function (copy) {
					$scope.snippetCode = copy;
				});
				$scope.snippetCode.removeClass('ng-scope');
				var hljs = angular.element('<div hljs></div>');
				hljs.append($scope.snippetCode);
				$element.find('span').append(hljs);
				$compile(hljs)($scope);
			},
			transclude: true,
			link: function (scope, iElement) {
				scope.snippetHash = scope.snippetTitle.replace(/ /g, '-')
					.toLowerCase();
				scope.snippetExpanded = false;
				scope.snippetHeight = iElement[0].querySelector('.hljs')
					.offsetHeight;

				scope.toggleSnippet = function () {
					scope.snippetExpanded = !scope.snippetExpanded;
				};

				scope.getSnippetHeight = function () {
					if (scope.snippetExpanded === true) {
						return {
							height: scope.snippetHeight + 'px'
						};
					} else {
						return {
							height: '0'
						};
					}
				};

				scope.$watch('snippetExpanded', function () {
					if (scope.snippetExpanded === true) {
						scope.snippetActiveClass = 'sg-snippet-active';
					} else {
						scope.snippetActiveClass = '';
					}
				});
			}
		};
	}

	angular
		.module('sgApp', ['ui.router','hljs'])
		.controller('sgController', sgController)
		.provider('getSnippets', getSnippets)
		.config(config)
		.run(['$rootScope', '$state', '$stateParams', 'getSnippets',
			function ($rootScope, $state, $stateParams, getSnippets) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			getSnippets.setUpRoutes();
			$state.transitionTo('home');
		}])
		.filter('capitalize', capitalize)
		.directive('navigation',navigation)
		.directive('palette',palette)
		.directive('fonts',fonts)
		.directive('snippet',snippet);
})();
