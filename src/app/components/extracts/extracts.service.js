export class ExtractsService {
    constructor ($log, Loading, Oereb) {

        'ngInject';

        this.$log = $log;
        this.extracts = [];
        this.Loading = Loading;
        this.Oereb = Oereb;
    }

    reset() {
        this.extracts = [];
    }

    add(newExtract) {
        let self = this;
        
        this.$log.warn('extract loaded: ' + newExtract.egrid);

        this.Loading.show();

        this.Oereb.getExtractById(newExtract.egrid).then(function (d) {
            self.$log(d);
        });

        // adds remove function to extract
        newExtract.remove = function() { self.remove(this.egrid); };

        this.extracts.push(newExtract);
    }

    remove(egrid) {
        let self = this;

        for(var i = 0; i < this.extracts.length; i++){
            if(this.extracts[i].egrid == egrid){
                self.extracts.splice(i,1);
            }
        }

        this.$log.warn("animation: remove" + egrid);

        return egrid;
    }

    get() {
        return this.extracts;
    }
}
