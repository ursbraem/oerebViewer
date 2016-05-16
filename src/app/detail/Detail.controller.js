export class DetailController {
    constructor($log, $translate, Extracts, $stateParams, $location, $scope) {
        'ngInject';

        let self = this;
        this.Extracts = Extracts;
        this.$location = $location;

        this.noDatas = true;
        if ($stateParams.egrid == 0) {
            this.noDatas = false;
        } else {
            this.addExtract($stateParams.egrid);
        }

        // triggers restriction changed at startup
        this.restrictionChanged();

        // if location searchpath is changed, restrictionchanges
        $scope.$on('$locationChangeSuccess', function () {
            self.restrictionChanged();
        });


        angular.element('aside').foundation();

        // Menubutton in header will change to cross [x] if menu is open.
        var $menuNav = angular.element('.menu-nav');
        var $panel = angular.element('#menuLeftSlider');

        if ($panel.attr('aria-expanded')=='true') {
          $log.debug('active');
        }
    }

    restrictionChanged() {
        this.Extracts.setRestriction(
            this.$location.search().restriction
        );
    }

    addExtract(egrid) {
        this.Extracts.add(
            {
                egrid: egrid
            }
        )
    }
}